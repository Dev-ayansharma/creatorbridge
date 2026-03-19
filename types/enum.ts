// types/enums.ts
export enum UserRole {
  EDITOR = "EDITOR",
  OWNER = "OWNER",
}

export enum AuthProvider {
  GOOGLE = "GOOGLE",
  CREDENTIALS = "CREDENTIALS",
}

export enum VideoStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  UPLOADED = "UPLOADED",
}

export enum ApprovalDecision {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}