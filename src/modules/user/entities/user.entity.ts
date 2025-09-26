import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity() // 标记这是实体，默认会创建表名 user（类名小写)
export class User {
  @PrimaryGeneratedColumn() // 主键: 自动递增，对应 INT PRIMARY KEY AUTO_INCREMENT
  id: number;

  @Column({
    // 普通字段，定义表列
    length: 50, // 字段长度 50
    unique: true, // 唯一约束
    comment: '用户名', // 注释
  })
  username: string;

  @Column({
    select: false, // 查询时默认不返回，避免密码泄露
    comment: '密码(生产环境记得密文)',
  })
  password: string;

  @Column({
    type: 'int', // 字段类型 int
    nullable: true, // 允许为空
    comment: '年龄',
  })
  age?: number;

  @Column({
    type: 'bigint',
    comment: '余额 分',
  }) // 避免精度问题 bigint 是因为 2100万 会超过 21亿分
  balance: number;

  @CreateDateColumn({
    // 自动记录创建时间
    name: 'create_at', // 数据库字段名
    comment: '创建时间',
  })
  createAt: Date;

  @UpdateDateColumn({
    // 自动记录更新时间
    name: 'update_at',
    comment: '更新时间',
  })
  updateAt: Date;
}
