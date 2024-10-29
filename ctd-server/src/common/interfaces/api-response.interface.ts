export interface ApiResponse<T = any> {
  code: number; // 0 表示成功，非0表示各种错误
  msg?: string; // 提供错误消息或成功消息
  data?: T; // 泛型数据，根据不同接口返回不同数据类型
}
