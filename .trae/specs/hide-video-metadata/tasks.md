# 隐藏作品展示区元数据 - The Implementation Plan (Decomposed and Prioritized Task List)

## [ ] Task 1: 隐藏视频卡片上的时长徽章
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 注释掉 video-showcase.tsx 中第 127-130 行的时长徽章代码
  - 该代码显示 Clock 图标和 "0:00" 文本
- **Acceptance Criteria Addressed**: [AC-1, AC-5]
- **Test Requirements**:
  - `human-judgement` TR-1.1: 视频卡片右下角不显示时长徽章
  - `programmatic` TR-1.2: 相关代码使用 `{/* */}` 注释
- **Notes**: 保持代码可恢复，不要删除

## [ ] Task 2: 隐藏视频卡片底部的观看和点赞统计
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 注释掉 video-showcase.tsx 中第 145-154 行的统计代码
  - 该代码显示 Eye 图标、Heart 图标及对应数字
- **Acceptance Criteria Addressed**: [AC-2, AC-5]
- **Test Requirements**:
  - `human-judgement` TR-2.1: 视频卡片底部不显示观看和点赞统计
  - `programmatic` TR-2.2: 相关代码使用 `{/* */}` 注释
- **Notes**: 保持代码可恢复，不要删除

## [ ] Task 3: 隐藏视频弹窗中的时长显示
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 注释掉 video-showcase.tsx 中第 212-215 行的时长代码
  - 该代码在弹窗顶部显示 Clock 图标和 "0:00"
- **Acceptance Criteria Addressed**: [AC-3, AC-5]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 视频弹窗顶部不显示时长
  - `programmatic` TR-3.2: 相关代码使用 `{/* */}` 注释
- **Notes**: 保持代码可恢复，不要删除

## [ ] Task 4: 隐藏视频弹窗中的观看和点赞统计
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 注释掉 video-showcase.tsx 中第 219-228 行的统计代码
  - 该代码在弹窗底部显示 Eye 图标、Heart 图标及对应数字
- **Acceptance Criteria Addressed**: [AC-4, AC-5]
- **Test Requirements**:
  - `human-judgement` TR-4.1: 视频弹窗底部不显示观看和点赞统计
  - `programmatic` TR-4.2: 相关代码使用 `{/* */}` 注释
- **Notes**: 保持代码可恢复，不要删除
