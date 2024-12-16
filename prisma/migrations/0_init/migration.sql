-- CreateTable
CREATE TABLE "Mode" (
    "id" SERIAL NOT NULL,
    "mode" TEXT NOT NULL,

    CONSTRAINT "Mode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "AppointmentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "availabilityId" INTEGER NOT NULL,
    "modeId" INTEGER NOT NULL,
    "appointmentTypeId" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_availabilityId_key" ON "Appointment"("availabilityId");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_modeId_key" ON "Appointment"("modeId");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_appointmentTypeId_key" ON "Appointment"("appointmentTypeId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "Mode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_appointmentTypeId_fkey" FOREIGN KEY ("appointmentTypeId") REFERENCES "AppointmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

