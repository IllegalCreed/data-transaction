import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { ErrorCode } from 'src/common/constants/error-codes';
import { ExpectedError } from 'src/types/error';
import { UserStatus } from 'src/enums/user-status.enum';

@Injectable()
export class UserService {
  protected logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 批量修改用户状态
   * @param ids 用户id列表
   * @param status 目标状态
   */
  async changeUserStatus(ids: number[], status: UserStatus): Promise<void> {
    let updateResult;
    try {
      updateResult = await this.userRepository.update(
        { id: In(ids) },
        { status },
      );
    } catch (error) {
      this.logger.error('修改用户状态失败: 数据库保存失败', error);
      throw new ExpectedError(ErrorCode.UPDATE_USER_STATUS_FAILED);
    }

    if (updateResult.affected === 0) {
      this.logger.warn(`修改用户状态失败: 未找到任何匹配的用户: [${ids}]`);
      throw new ExpectedError(ErrorCode.USER_NOT_FOUND);
    }
  }

  /**
   * 批量删除用户（软删除）
   * @param ids 用户 ID 数组
   */
  async deleteUser(ids: number[]): Promise<void> {
    // 1) 检查是否存在这些用户
    const users = await this.userRepository.find({
      where: { id: In(ids) },
      withDeleted: false, // 只查未软删除的
    });

    if (!users || users.length === 0) {
      this.logger.warn(`删除用户失败: 未找到任何匹配的用户: [${ids}]`);
      throw new ExpectedError(ErrorCode.USER_NOT_FOUND);
    }

    // 2) 软删除
    try {
      // 方式一：使用 repository.softRemove(users)
      await this.userRepository.softRemove(users);

      // 方式二：也可使用 softDelete:
      // await this.userRepository.softDelete({ id: In(ids) });
      // 具体看您是否需要在此读取 user 实体
    } catch (error) {
      this.logger.error('删除用户失败: 数据库删除失败', error);
      throw new ExpectedError(ErrorCode.DELETE_USER_FAILED);
    }
  }
}
