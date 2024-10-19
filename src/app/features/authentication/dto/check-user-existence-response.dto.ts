export interface CheckUserExistenceResponseDto {
  Status: number;
  Response: {
    status: 'Pending' | Omit<string, 'Pending'>;
    op: 'No record in existence' | Omit<string, 'No record in existence'>;
  };
}
