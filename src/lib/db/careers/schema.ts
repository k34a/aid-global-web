import { z } from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const allowedFileTypes = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const isAllowedFileType = (fileType: string): boolean => {
	return allowedFileTypes.includes(fileType as any);
};

export const isFileSizeValid = (fileSize: number): boolean => {
	return fileSize > 0 && fileSize <= MAX_FILE_SIZE;
};

export const careerApplicationSchema = z.object({
	userInfo: z.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.string().email("Invalid email address"),
		contact: z.string().min(1, "Contact number is required"),
		applyingFor: z.string().min(1, "Position is required"),
	}),
	resume: z.object({
		fileName: z.string().min(1, "File name is required"),
		fileSize: z
			.number()
			.positive("File size must be positive")
			.max(MAX_FILE_SIZE, "File size must be less than 5MB"),
		fileType: z.string().min(1, "File type is required"),
	}),
});

export type CareerApplicationData = z.infer<typeof careerApplicationSchema>;
