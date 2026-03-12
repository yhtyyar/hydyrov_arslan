import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create default schedule (Mon-Sat, 9:00-18:00, break 13:00-14:00)
  const days = [
    { dayOfWeek: 0, isWorkingDay: false, startTime: "09:00", endTime: "18:00" }, // Sunday - off
    { dayOfWeek: 1, isWorkingDay: true, startTime: "09:00", endTime: "18:00", breakStart: "13:00", breakEnd: "14:00" },
    { dayOfWeek: 2, isWorkingDay: true, startTime: "09:00", endTime: "18:00", breakStart: "13:00", breakEnd: "14:00" },
    { dayOfWeek: 3, isWorkingDay: true, startTime: "09:00", endTime: "18:00", breakStart: "13:00", breakEnd: "14:00" },
    { dayOfWeek: 4, isWorkingDay: true, startTime: "09:00", endTime: "18:00", breakStart: "13:00", breakEnd: "14:00" },
    { dayOfWeek: 5, isWorkingDay: true, startTime: "09:00", endTime: "18:00", breakStart: "13:00", breakEnd: "14:00" },
    { dayOfWeek: 6, isWorkingDay: true, startTime: "09:00", endTime: "15:00" }, // Saturday - short day
  ];

  for (const day of days) {
    await prisma.schedule.upsert({
      where: { dayOfWeek: day.dayOfWeek },
      update: day,
      create: day,
    });
  }

  console.log("Schedule created");

  // Create services
  const services = [
    { name: "Консультация", description: "Первичная консультация и осмотр", price: 0, duration: 30, category: "Общее", sortOrder: 0 },
    { name: "Лечение кариеса", description: "Лечение кариеса с пломбированием", price: 200000, duration: 60, category: "Терапия", sortOrder: 1 },
    { name: "Лечение пульпита", description: "Эндодонтическое лечение каналов", price: 400000, duration: 90, category: "Терапия", sortOrder: 2 },
    { name: "Профессиональная чистка", description: "Ультразвуковая чистка + Air Flow", price: 150000, duration: 45, category: "Профилактика", sortOrder: 3 },
    { name: "Отбеливание ZOOM", description: "Профессиональное отбеливание в клинике", price: 500000, duration: 60, category: "Эстетика", sortOrder: 4 },
    { name: "Виниры E-Max", description: "Керамические виниры (1 зуб)", price: 1000000, duration: 90, category: "Эстетика", sortOrder: 5 },
    { name: "Имплантация", description: "Установка импланта Straumann", price: 3000000, duration: 120, category: "Хирургия", sortOrder: 6 },
    { name: "Удаление зуба", description: "Простое удаление", price: 300000, duration: 30, category: "Хирургия", sortOrder: 7 },
    { name: "Коронка металлокерамика", description: "Металлокерамическая коронка (1 ед.)", price: 800000, duration: 60, category: "Ортопедия", sortOrder: 8 },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  console.log("Services created");

  // Create admin user
  await prisma.user.create({
    data: {
      email: "admin@hydyrov-dental.com",
      name: "Dr. Hydyrov Arslan",
      phone: "+998901234567",
      role: "ADMIN",
      passwordHash: "", // Set via auth flow
    },
  });

  console.log("Admin user created");
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
