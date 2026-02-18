# Emeralds Database Schema

Reference schema for the emeralds table (Supabase implementation).

## Table: `emeralds`

| Column | Type | Example | Notes |
|---|---|---|---|
| `id` | UUID / Serial | auto-generated | Primary key |
| `name` | Text | Esmeralda Muzo Premium | Display name |
| `description` | Text (nullable) | Piedra selecta de 2.3ct... | Optional description |
| `price` | Numeric (USD) | 4500 | Price in dollars |
| `carat` | Decimal | 2.3 | Total weight in carats |
| `stone_count` | Integer | 1 | 1 = single stone, >1 = lot |
| `origin` | Enum | Muzo | See enum values below |
| `clarity` | Enum | AAA | See enum values below |
| `cut` | Enum | Emerald | See enum values below |
| `is_wholesale` | Boolean | true | Marks it for the Mayoristas section |
| `image` | Text | /images/emerald-1.jpg | Image path or storage URL |
| `created_at` | Timestamp | auto-generated | Row creation timestamp |

## Enum Values

| Enum | Values |
|---|---|
| **origin** | `Muzo`, `Chivor`, `Coscuez`, `Gachala` |
| **clarity** | `AAA`, `AA`, `A`, `B` |
| **cut** | `Emerald`, `Oval`, `Pear`, `Round` |

## Filtering Logic

- **Tienda** (retail) — `is_wholesale = false`
- **Mayoristas** (wholesale) — `is_wholesale = true` (single stones or lots, `stone_count` varies)

## Notes

- Column names use `snake_case` to follow Supabase/Postgres conventions.
- The `image` field will point to Supabase Storage once integrated.
- Enums can be Postgres enums or text columns with check constraints.
