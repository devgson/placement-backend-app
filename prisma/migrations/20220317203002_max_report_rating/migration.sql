ALTER TABLE "placementMonthlyReports"
ADD CONSTRAINT "max_rating" CHECK (rating >= 0 AND rating <= 5);