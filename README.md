# create table
-- 创建品牌表
CREATE TABLE tf_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE
);

-- 创建供应商表
CREATE TABLE tf_suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  contact_info TEXT
);

-- 插入示例品牌数据
INSERT INTO tf_brands (id, name) VALUES
('b4277517-b2b9-44b0-92a4-3597afece019', 'Jushi'),
('c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'CPIC'),
('d9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'NEG'),
('e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', 'OC'),
('f39cde6e-33da-4315-8b97-b8fdd197df53', 'Taishan');

-- 插入示例供应商数据
INSERT INTO tf_suppliers (id, name, contact_info) VALUES
('98b6ab14-3455-4501-9286-40012d244bf0', 'Supplier A', 'contactA@example.com'),
('a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e', 'Supplier B', 'contactB@example.com'),
('b16a9a1d-cf58-46bf-a7df-765c71b9996f', 'Supplier C', 'contactC@example.com');



-- 1. 玻璃纤维布表
CREATE TABLE tf_glass_fiber_fabrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  weight_gsm INTEGER NOT NULL,
  weave_type VARCHAR(100) NOT NULL,
  width_mm INTEGER NOT NULL,
  application TEXT,
  brand_id UUID REFERENCES tf_brands(id),
  supplier_id UUID REFERENCES tf_suppliers(id)
);

INSERT INTO tf_glass_fiber_fabrics (name, weight_gsm, weave_type, width_mm, application, brand_id, supplier_id) VALUES
('Jushi Fabric 200gsm Plain', 200, 'Plain', 1500, '复合材料', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
('CPIC Fabric 300gsm Twill', 300, 'Twill', 1600, '汽车制造', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('NEG Fabric 250gsm Satin', 250, 'Satin', 1450, '电子产品', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('OC Fabric 220gsm Plain', 220, 'Plain', 1500, '体育用品', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Taishan Fabric 280gsm Twill', 280, 'Twill', 1550, '建筑材料', 'f39cde6e-33da-4315-8b97-b8fdd197df53', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('Jushi Fabric 210gsm Satin', 210, 'Satin', 1480, '航天航空', 'b4277517-b2b9-44b0-92a4-3597afece019', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('CPIC Fabric 230gsm Plain', 230, 'Plain', 1500, '包装材料', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', '98b6ab14-3455-4501-9286-40012d244bf0'),
('NEG Fabric 270gsm Twill', 270, 'Twill', 1520, '电子器件', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('OC Fabric 260gsm Satin', 260, 'Satin', 1550, '汽车内饰', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Taishan Fabric 240gsm Plain', 240, 'Plain', 1500, '运动器材', 'f39cde6e-33da-4315-8b97-b8fdd197df53', '98b6ab14-3455-4501-9286-40012d244bf0');



-- 2. 玻璃纤维格栅表
CREATE TABLE tf_glass_fiber_grids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  mesh_size_mm INTEGER NOT NULL,
  weight_gsm INTEGER NOT NULL,
  width_mm INTEGER NOT NULL,
  application TEXT,
  brand_id UUID REFERENCES tf_brands(id),
  supplier_id UUID REFERENCES tf_suppliers(id)
);

INSERT INTO tf_glass_fiber_grids (name, mesh_size_mm, weight_gsm, width_mm, application, brand_id, supplier_id) VALUES
('Jushi Grid 10x10mm', 10, 300, 1500, '建筑增强', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
('CPIC Grid 12x12mm', 12, 320, 1520, '土工材料', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('NEG Grid 15x15mm', 15, 350, 1480, '公路加固', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('OC Grid 10x20mm', 20, 310, 1500, '桥梁工程', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Taishan Grid 8x8mm', 8, 290, 1550, '隧道衬砌', 'f39cde6e-33da-4315-8b97-b8fdd197df53', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('Jushi Grid 11x11mm', 11, 305, 1480, '水利工程', 'b4277517-b2b9-44b0-92a4-3597afece019', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('CPIC Grid 13x13mm', 13, 315, 1500, '环保工程', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', '98b6ab14-3455-4501-9286-40012d244bf0'),
('NEG Grid 14x14mm', 14, 320, 1520, '土工加固', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('OC Grid 12x16mm', 16, 330, 1480, '基础加固', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Taishan Grid 10x10mm', 10, 340, 1500, '道路铺设', 'f39cde6e-33da-4315-8b97-b8fdd197df53', '98b6ab14-3455-4501-9286-40012d244bf0');



-- 3. 玻璃纤维短切原丝表
CREATE TABLE tf_glass_fiber_chopped_strands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  length_mm FLOAT NOT NULL,
  diameter_um FLOAT NOT NULL,
  compatibility VARCHAR(50),
  application TEXT,
  brand_id UUID REFERENCES tf_brands(id),
  supplier_id UUID REFERENCES tf_suppliers(id)
);

INSERT INTO tf_glass_fiber_chopped_strands (name, length_mm, diameter_um, compatibility, application, brand_id, supplier_id) VALUES
('Jushi 4.5mm PP', 4.5, 13, 'PP', '汽车注塑件', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
('CPIC 3mm PA66', 3, 10, 'PA66', '电子连接器', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('NEG 6mm PBT', 6, 11, 'PBT', '电器外壳', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('OC 3mm PP', 3, 14, 'PP', '电池盒', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Taishan 4.5mm UP', 4.5, 13, 'UP', '玻璃钢增强', 'f39cde6e-33da-4315-8b97-b8fdd197df53', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('CPIC 6mm PA6', 6, 12, 'PA6', '工具外壳', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Jushi 4.5mm PET', 4.5, 11, 'PET', '消费电子', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
('NEG 3mm PP', 3, 10, 'PP', '家电注塑件', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('Taishan 6mm PA66', 6, 13, 'PA66', '工程塑料部件', 'f39cde6e-33da-4315-8b97-b8fdd197df53', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('OC 4.5mm UP', 4.5, 12, 'UP', 'SMC板材', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0');



-- 4. 玻璃纤维纱线表
CREATE TABLE tf_glass_fiber_yarns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  tex INTEGER NOT NULL,
  twist_tpm INTEGER NOT NULL,
  glass_type VARCHAR(50),
  application TEXT,
  brand_id UUID REFERENCES tf_brands(id),
  supplier_id UUID REFERENCES tf_suppliers(id)
);

INSERT INTO tf_glass_fiber_yarns (name, tex, twist_tpm, glass_type, application, brand_id, supplier_id) VALUES
('Jushi Yarn 300 tex 20 t/m E-glass', 300, 20, 'E-glass', '复合材料', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
('CPIC Yarn 310 tex 22 t/m C-glass', 310, 22, 'C-glass', '电子绝缘', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('NEG Yarn 320 tex 21 t/m E-glass', 320, 21, 'E-glass', '运动器材', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('OC Yarn 300 tex 23 t/m C-glass', 300, 23, 'C-glass', '电器绝缘', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Taishan Yarn 330 tex 20 t/m E-glass', 330, 20, 'E-glass', '包装材料', 'f39cde6e-33da-4315-8b97-b8fdd197df53', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('Jushi Yarn 340 tex 21 t/m C-glass', 340, 21, 'C-glass', '电子产品', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
('CPIC Yarn 300 tex 22 t/m E-glass', 300, 22, 'E-glass', '运动器材', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('NEG Yarn 320 tex 23 t/m C-glass', 320, 23, 'C-glass', '船舶制造', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Taishan Yarn 310 tex 20 t/m E-glass', 310, 20, 'E-glass', '电器外壳', 'f39cde6e-33da-4315-8b97-b8fdd197df53', '98b6ab14-3455-4501-9286-40012d244bf0'),
('OC Yarn 330 tex 22 t/m C-glass', 330, 22, 'C-glass', '交通运输', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0');



-- 5. 玻璃纤维粉末表
CREATE TABLE tf_glass_fiber_powders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  particle_size_um INTEGER NOT NULL,
  purity_percent FLOAT,
  application TEXT,
  brand_id UUID REFERENCES tf_brands(id),
  supplier_id UUID REFERENCES tf_suppliers(id)
);

INSERT INTO tf_glass_fiber_powders (name, particle_size_um, purity_percent, application, brand_id, supplier_id) VALUES
('Jushi Powder 50um', 50, 99.5, '涂料', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
('CPIC Powder 40um', 40, 98.7, '塑料填充', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('NEG Powder 60um', 60, 99.1, '造纸助剂', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('OC Powder 55um', 55, 99.0, '橡胶增强', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Taishan Powder 45um', 45, 98.8, '陶瓷制造', 'f39cde6e-33da-4315-8b97-b8fdd197df53', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('Jushi Powder 50um', 50, 99.3, '复合材料', 'b4277517-b2b9-44b0-92a4-3597afece019', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('CPIC Powder 42um', 42, 98.9, '涂料', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', '98b6ab14-3455-4501-9286-40012d244bf0'),
('NEG Powder 58um', 58, 99.2, '塑料填充', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('OC Powder 53um', 53, 99.1, '造纸助剂', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Taishan Powder 47um', 47, 98.6, '橡胶增强', 'f39cde6e-33da-4315-8b97-b8fdd197df53', '98b6ab14-3455-4501-9286-40012d244bf0');



-- 6. 玻璃纤维毡表
CREATE TABLE tf_glass_fiber_mats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  weight_gsm INTEGER NOT NULL,
  thickness_mm FLOAT NOT NULL,
  application TEXT,
  brand_id UUID REFERENCES tf_brands(id),
  supplier_id UUID REFERENCES tf_suppliers(id)
);

INSERT INTO tf_glass_fiber_mats (name, weight_gsm, thickness_mm, application, brand_id, supplier_id) VALUES
('Jushi Mat 300gsm 1.5mm', 300, 1.5, '复合材料增强', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
('CPIC Mat 250gsm 1.2mm', 250, 1.2, '船舶制造', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('NEG Mat 280gsm 1.4mm', 280, 1.4, '汽车零部件', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('OC Mat 260gsm 1.3mm', 260, 1.3, '建筑材料', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Taishan Mat 240gsm 1.1mm', 240, 1.1, '电子产品', 'f39cde6e-33da-4315-8b97-b8fdd197df53', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('Jushi Mat 310gsm 1.6mm', 310, 1.6, '体育用品', 'b4277517-b2b9-44b0-92a4-3597afece019', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('CPIC Mat 270gsm 1.3mm', 270, 1.3, '交通运输', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', '98b6ab14-3455-4501-9286-40012d244bf0'),
('NEG Mat 290gsm 1.5mm', 290, 1.5, '包装材料', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('OC Mat 280gsm 1.4mm', 280, 1.4, '医疗器械', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Taishan Mat 260gsm 1.2mm', 260, 1.2, '家居用品', 'f39cde6e-33da-4315-8b97-b8fdd197df53', '98b6ab14-3455-4501-9286-40012d244bf0');



-- 7. 氧化铝纤维表
CREATE TABLE tf_alumina_fibers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  diameter_um FLOAT NOT NULL,
  length_mm FLOAT NOT NULL,
  purity_percent FLOAT,
  application TEXT,
  brand_id UUID REFERENCES tf_brands(id),
  supplier_id UUID REFERENCES tf_suppliers(id)
);

INSERT INTO tf_alumina_fibers (name, diameter_um, length_mm, purity_percent, application, brand_id, supplier_id) VALUES
('Alumina Fiber A1', 3.5, 12, 99.9, '高温隔热', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Alumina Fiber B2', 4.0, 15, 99.8, '陶瓷纤维增强', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('Alumina Fiber C3', 3.2, 10, 99.7, '隔热材料', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Alumina Fiber D4', 3.8, 13, 99.6, '过滤材料', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Alumina Fiber E5', 4.1, 14, 99.9, '耐火材料', 'f39cde6e-33da-4315-8b97-b8fdd197df53', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('Alumina Fiber F6', 3.9, 12.5, 99.8, '电子绝缘', 'b4277517-b2b9-44b0-92a4-3597afece019', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Alumina Fiber G7', 3.6, 11, 99.7, '光学材料', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Alumina Fiber H8', 4.2, 13.5, 99.9, '医疗器械', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('Alumina Fiber I9', 3.7, 12.8, 99.8, '汽车部件', 'f39cde6e-33da-4315-8b97-b8fdd197df53', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Alumina Fiber J10', 3.4, 11.5, 99.7, '家用电器', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0');



-- 8. 陶瓷纤维布表
CREATE TABLE tf_ceramic_fiber_fabrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  weight_gsm INTEGER NOT NULL,
  thickness_mm FLOAT NOT NULL,
  application TEXT,
  brand_id UUID REFERENCES tf_brands(id),
  supplier_id UUID REFERENCES tf_suppliers(id)
);

INSERT INTO tf_ceramic_fiber_fabrics (name, weight_gsm, thickness_mm, application, brand_id, supplier_id) VALUES
('Ceramic Fabric A 300gsm 1.5mm', 300, 1.5, '高温隔热', 'b4277517-b2b9-44b0-92a4-3597afece019', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Ceramic Fabric B 250gsm 1.2mm', 250, 1.2, '工业炉衬', 'c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e'),
('Ceramic Fabric C 280gsm 1.4mm', 280, 1.4, '陶瓷增强', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Ceramic Fabric D 260gsm 1.3mm', 260, 1.3, '耐火材料', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Ceramic Fabric E 240gsm 1.1mm', 240, 1.1, '隔热毯', 'f39cde6e-33da-4315-8b97-b8fdd197df53', 'a09b1b7c-cf9-49b9-81cd-edae9f2a2d9e'),
('Ceramic Fabric F 310gsm 1.6mm', 310, 1.6, '工业防护', 'b4277517-b2b9-44b0-92a4-3597afece019', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Ceramic Fabric G 270gsm 1.3mm', 270, 1.3, '电厂绝缘', 'c83f7ed9-8877-4dfb-ae6f-e6f-e6b4cdd3cbb5', '98b6ab14-3455-4501-9286-40012d244bf0'),
('Ceramic Fabric H 290gsm 1.5mm', 290, 1.5, '高温过滤', 'd9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'a09b1b7c-c6f9-49b9-81cd-edae9f2a2d9e'),
('Ceramic Fabric I 280gsm 1.4mm', 280, 1.4, '热电厂', 'f39cde6e-33da-4315-8b97-b8fdd197df0', 'b16a9a1d-cf58-46bf-a7df-765c71b9996f'),
('Ceramic Fabric J 260gsm 1.2mm', 260, 1.2, '环境防护', 'e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', '98b6ab14-3455-4501-9286-40012d244bf0');



-- 9. 供应商表
CREATE TABLE tf_suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  contact_info TEXT,
  address TEXT,
  website VARCHAR(200)
);

INSERT INTO tf_suppliers (id, name, contact_info, address, website) VALUES
('98b6ab14-3455-4501-9286-40012d244bf0', 'Global Glass Supplier', 'contact@globalglass.com', '123 Glass St, Glass City', 'https://globalglass.com'),
('a09b1b7a-c6f9-49b9-81cd-edae9f2a2d9e', 'China Fiberglass Inc.', 'info@chinaglass.com', '456 Fiber Rd, Beijing', 'https://chinaglass.com'),
('b16a9a1d-cf58-46bf-a7df-765c71b9996f', 'FiberTech Supplies', 'sales@fibertech.com', '789 Tech Park, Shanghai', 'https://fibertech.com');



-- 10. 品牌表
CREATE TABLE tf_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  description TEXT
);

INSERT INTO tf_brands (id, name, description) VALUES
('b4277517-b2b9-44b0-92a4-3597afece019', 'Jushi', '全球领先的玻璃纤维品牌'),
('c83f7ed9-8877-4dfb-ae6f-e6b4cdd3cbb5', 'CPIC', '中国玻纤知名品牌'),
('d9a26e55-fd52-4e17-8d92-cfd9f0b69a48', 'NEG', '日本优质玻纤品牌'),
('e8bd5c2a-4b59-413e-909a-9a5e0c6ab2a1', 'OC', '美国创新玻纤品牌'),
('f39cde6e-33da-4315-8b97-b8fdd197df53', 'Taishan', '中国本土高端玻纤品牌');



-- 索引优化示例
CREATE INDEX idx_tf_glass_fiber_rods_diameter ON tf_glass_fiber_rods(diameter_mm);
CREATE INDEX idx_tf_glass_fiber_rods_application ON tf_glass_fiber_rods(application);

CREATE INDEX idx_tf_glass_fiber_yarns_tex ON tf_glass_fiber_yarns(tex);
CREATE INDEX idx_tf_glass_fiber_yarns_glass_type ON tf_glass_fiber_yarns(glass_type);

CREATE INDEX idx_tf_glass_fiber_powders_particle_size ON tf_glass_fiber_powders(particle_size_um);
CREATE INDEX idx_tf_glass_fiber_powders_purity ON tf_glass_fiber_powders(purity_percent);

CREATE INDEX idx_tf_glass_fiber_mats_weight ON tf_glass_fiber_mats(weight_gsm);
CREATE INDEX idx_tf_glass_fiber_mats_thickness ON tf_glass_fiber_mats(thickness_mm);

CREATE INDEX idx_tf_alumina_fibers_diameter ON tf_alumina_fibers(diameter_um);
CREATE INDEX idx_tf_alumina_fibers_purity ON tf_alumina_fibers(purity_percent);

CREATE INDEX idx_tf_ceramic_fiber_fabrics_weight ON tf_ceramic_fiber_fabrics(weight_gsm);
CREATE INDEX idx_tf_ceramic_fiber_fabrics_thickness ON tf_ceramic_fiber_fabrics(thickness_mm);

-- 以上是基于你需求设计的统一的 Supabase 数据表结构，包含样品类型详细字段及相关品牌和供应商关联，方便后续扩展和查询。
-- 若你需要，我可以帮你写对应的 Next.js + Supabase 查询和展示组件模板，或者帮你生成相关 API 路由设计方案。
