# Trading Panel

**Stack:** React + TypeScript  
**UI:** Любой (CSS, Tailwind, MUI — на выбор)

---

## Задание

### Часть 1: Trading Panel
Сверастать: https://iimg.su/i/QrvPwm

### Часть 2: Форма позиции

Создать **Trading Form** с полями:

| Поле        | Тип          | Описание                   |
|-------------|--------------|----------------------------|
| Side        | Toggle       | Long / Short               |
| Entry Price | number input | Цена входа в позицию       |
| Size        | number input | Количество контрактов      |
| Leverage    | slider 1-20x | Кредитное плечо            |

#### Расчёты в реальном времени

Реализовать в `src/utils/calculations.ts`:

```typescript
// Notional Value (объём позиции в $)
notionalValue = entryPrice * size

// Required Margin (необходимый залог)
requiredMargin = notionalValue / leverage

// Maintenance Margin (минимальный залог, 0.5% от notional)
maintenanceMargin = notionalValue * 0.005

// Liquidation Price
// Long:
liquidationPrice = entryPrice * (1 - 1/leverage + 0.005)
// Short:
liquidationPrice = entryPrice * (1 + 1/leverage - 0.005)
```

#### Валидация

Реализовать:

- `leverage` ≤ 20
- `requiredMargin` > `maintenanceMargin`
- Все поля заполнены и > 0

При ошибке:
- Показать warning message
- Disable кнопку "Open Position"

---

### Часть 3: Order Flow

После нажатия **"Open Position"**:

#### Mock API (уже готов в `src/api/mock.ts`)

```typescript
// POST /api/order — создание ордера
createOrder(data) → { orderId: string }

// GET /api/order/:id — статус ордера  
getOrderStatus(orderId) → {
  status: 'pending' | 'accepted' | 'rejected' | 'filled',
  filledSize?: number,
  reason?: string
}
```
