## 2025.5.24

查看字段（列）名称
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM
  information_schema.columns
WHERE
  table_schema = 'public'  -- 如果你的表在 public schema 中
  AND table_name = 'tf_glass_fiber_mats';