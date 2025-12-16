import type { Directive } from 'vue'

// 单个权限验证指令
export type AuthDirective = Directive<HTMLElement, string>

// 多个权限验证指令（满足一个则显示）
export type AuthsDirective = Directive<HTMLElement, string[]>

// 多个权限验证指令（全部满足则显示）
export type AuthsAllDirective = Directive<HTMLElement, string[]>

// 角色权限验证指令
export type RoleDirective = Directive<HTMLElement, string | string[]>

// 时间格式化指令
export type TimeDirective = Directive<HTMLElement, string | number | Date>

// 复制内容指令
export type CopyDirective = Directive<HTMLElement, string>

declare module 'vue' {
  export interface ComponentCustomProperties {
    // 单个权限验证（v-auth="'xxx'"）
    vAuth: AuthDirective
    // 多个权限验证，满足一个则显示（v-auths="['xxx','xxx']"）
    vAuths: AuthsDirective
    // 多个权限验证，全部满足则显示（v-auths-all="['xxx','xxx']"）
    vAuthsAll: AuthsAllDirective
    // 角色权限验证（v-role="'admin'" 或 v-role="['admin','user']"）
    vRole: RoleDirective
    // 时间格式化显示（v-time="timestamp"）
    vTime: TimeDirective
    // 复制内容到剪贴板（v-copy="'text'"）
    vCopy: CopyDirective
  }
}
