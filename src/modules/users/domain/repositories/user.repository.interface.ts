import { User } from '../entities/user.entity';

export interface IUserRepository {
  /**
   * Create a new user
   * @param user User data to create
   */
  create(user: Partial<User>): Promise<User>;

  /**
   * Find user by email
   * @param email User email
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Find user by ID
   * @param id User ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Update user data
   * @param id User ID
   * @param data Data to update
   */
  update(id: string, data: Partial<User>): Promise<User>;

  /**
   * Update profile ID for user
   * @param userId User ID
   * @param profileId Profile ID
   */
  updateProfileId(userId: string, profileId: string): Promise<User>;

  /**
   * Verify user email
   * @param userId User ID
   */
  verifyEmail(userId: string): Promise<User>;
}
