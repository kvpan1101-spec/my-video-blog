# 隐藏作品展示区元数据 - Product Requirement Document

## Overview
- **Summary**: 在作品展示区域隐藏时间显示、观看数量和点赞数量的显示
- **Purpose**: 简化视频卡片的视觉呈现，移除目前没有实际数据的统计信息
- **Target Users**: 网站访客

## Goals
- 隐藏视频卡片右下角的时长徽章（Clock图标 + "0:00"）
- 隐藏视频卡片底部的观看数和点赞数统计（Eye图标、Heart图标）
- 隐藏视频弹窗中的时长显示、观看数和点赞数

## Non-Goals (Out of Scope)
- 不会删除相关的代码逻辑，只是注释掉
- 不会修改数据库或API
- 不会影响视频的播放功能

## Background & Context
- 当前作品展示区显示了固定的 "0:00" 时长和 "0" 观看/点赞数
- 这些统计数据目前没有实际数据支撑，显示为占位符
- 简化界面可以提升用户体验

## Functional Requirements
- **FR-1**: 隐藏视频卡片缩略图上的时长徽章
- **FR-2**: 隐藏视频卡片底部的观看和点赞统计
- **FR-3**: 隐藏视频弹窗中的时长显示
- **FR-4**: 隐藏视频弹窗中的观看和点赞统计

## Non-Functional Requirements
- **NFR-1**: 修改应使用注释方式，保持代码可恢复
- **NFR-2**: 不影响其他功能的正常运行

## Constraints
- **Technical**: 使用 Next.js + React + Tailwind CSS
- **Dependencies**: 仅修改 `components/video-showcase.tsx` 文件

## Assumptions
- 用户希望简化界面，而不是完全删除这些功能
- 未来可能需要恢复这些显示

## Acceptance Criteria

### AC-1: 视频卡片上的时长徽章隐藏
- **Given**: 用户访问作品展示区
- **When**: 查看视频卡片
- **Then**: 视频卡片右下角不显示 Clock 图标和 "0:00" 时长
- **Verification**: `human-judgment`

### AC-2: 视频卡片底部统计隐藏
- **Given**: 用户访问作品展示区
- **When**: 查看视频卡片
- **Then**: 视频卡片底部不显示 Eye 图标、Heart 图标及对应数字
- **Verification**: `human-judgment`

### AC-3: 视频弹窗中的时长隐藏
- **Given**: 用户打开视频弹窗
- **When**: 查看弹窗顶部信息
- **Then**: 弹窗中不显示 Clock 图标和 "0:00" 时长
- **Verification**: `human-judgment`

### AC-4: 视频弹窗中的统计隐藏
- **Given**: 用户打开视频弹窗
- **When**: 查看弹窗底部信息
- **Then**: 弹窗中不显示 Eye 图标、Heart 图标及对应数字
- **Verification**: `human-judgment`

### AC-5: 代码使用注释方式隐藏
- **Given**: 查看源代码
- **When**: 检查 video-showcase.tsx
- **Then**: 相关代码使用 `{/* */}` 注释，而非删除
- **Verification**: `programmatic`

## Open Questions
- 无
