# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

Вот перефразированный текст, который можно использовать в вашем проекте:

---

### Архитектурное разделение и принципы проектирования

Проект разработан с учетом следующих ключевых принципов:

#### Разделение на слои (Separation of Concerns)
- **Слой данных (Data Layer):** Включает интерфейсы и модели данных (например, `IProduct`, `ICustomerData`, `IOrder`), которые описывают структуру информации, получаемой от API и используемой в приложении.
- **Слой отображения (Presentation Layer):** Содержит компоненты пользовательского интерфейса, отвечающие за визуализацию данных (например, `ProductCard`, `Header`, `AddToCartButton`).
- **Слой навигации (Navigation Layer):** Управляет переходами между страницами и модальными окнами (например, логика перехода от `ProductCatalog` к `ProductDetailModal`).

#### Принцип единственной ответственности (Single Responsibility Principle)
Каждый класс или модуль выполняет только одну задачу. Например, компонент `ProductCard` отвечает исключительно за отображение информации о товаре, а модель `IProduct` описывает только данные товара.

#### Слабое связывание (Loose Coupling)
Взаимодействие между компонентами осуществляется через передачу данных (например, через параметры или события), а не через жесткую зависимость внутри классов. Это позволяет изменять и тестировать отдельные части системы независимо друг от друга.

---

### Типизация и модели данных

Все типы данных собраны в файле `src/types/index.ts`, что обеспечивает централизованное управление интерфейсами и типами. Типы разделены по функциональным группам:

#### Модели API
Описывают данные, получаемые от сервера:
```typescript
export interface IApiProduct {
  productId: string;
  productDescription: string;
  productImage: string;
  productTitle: string;
  productCategory: string;
  productPrice: number | null;
}

export interface IApiProductList {
  totalCount: number;
  productItems: IApiProduct[];
}
```

#### UI модели
Описывают данные, используемые в интерфейсе:
```typescript
export interface IProduct {
  productId: string;
  productDescription: string;
  productImage: string;
  productTitle: string;
  productCategory: string;
  productPrice: number | null;
}

export interface ICustomerData {
  paymentMethod: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
}

export interface IOrder {
  orderedProducts: IProduct[];
  customerInfo: ICustomerData;
  orderTotal: number;
}
```

#### Прочие типы
Используются для описания пропсов компонентов, навигационных событий и т.д.

---

### API эндпоинты

#### 1. Список товаров
- **Метод:** GET  
- **Эндпоинт:** `{{baseUrl}}/product/`  
- **Пример успешного ответа (200 OK):**
```json
{
  "totalCount": 15,
  "productItems": [
    {
      "productId": "123e4567-e89b-12d3-a456-426614174000",
      "productDescription": "A high-quality product designed for everyday use.",
      "productImage": "/images/product1.jpg",
      "productTitle": "Premium Notebook",
      "productCategory": "stationery",
      "productPrice": 1200
    },
    ...
  ]
}
```

#### 2. Товар
- **Метод:** GET  
- **Эндпоинт:** `{{baseUrl}}/product/{productId}`  
- **Пример успешного ответа (200 OK):**
```json
{
  "productId": "123e4567-e89b-12d3-a456-426614174000",
  "productDescription": "A high-quality product designed for everyday use.",
  "productImage": "/images/product1.jpg",
  "productTitle": "Premium Notebook",
  "productCategory": "stationery",
  "productPrice": 1200
}
```
- **Ответ при ошибке (404 Not Found):**
```json
{
  "error": "ProductNotFound"
}
```

#### 3. Заказ
- **Метод:** POST  
- **Эндпоинт:** `{{baseUrl}}/order`  
- **Пример тела запроса:**
```json
{
  "paymentMethod": "card",
  "customerEmail": "user@example.com",
  "customerPhone": "+79123456789",
  "customerAddress": "Moscow, Lenina str. 10",
  "orderTotal": 3500,
  "productIds": [
    "123e4567-e89b-12d3-a456-426614174000",
    "987f6543-e21b-12d3-a456-426614174999"
  ]
}
```
- **Пример успешного ответа (200 OK):**
```json
{
  "orderId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "confirmedTotal": 3500
}
```
- **Ошибки (400 Bad Request):**
  - Товар не найден:
    ```json
    {
      "error": "ProductNotFound"
    }
    ```
  - Неверная сумма заказа:
    ```json
    {
      "error": "InvalidOrderTotal"
    }
    ```
  - Не указан адрес:
    ```json
    {
      "error": "AddressRequired"
    }
    ```

---

### Компоненты и страницы

#### Компоненты
- **ProductCard:** Отображает информацию о товаре (название, цена, категория и т.д.) и включает кнопку "Добавить в корзину".
- **AddToCartButton:** Добавляет товар в корзину. Используется в `ProductDetailModal`.
- **Header:** Верхняя панель с логотипом и кнопкой корзины. Присутствует на главной странице и в каталоге товаров.
- **PaymentOptions:** Позволяет выбрать способ оплаты (например, "online", "cash"). Используется в `PaymentAddressModal`.
- **Form:** Переиспользуемая форма для ввода/редактирования данных покупателя (телефон, email, адрес). Используется в `ContactsModal`.
- **ProductCollection:** Коллекция карточек товаров, отображаемая на странице каталога товаров.
- **CartCollection:** Отображает список товаров, добавленных в корзину, и используется в `CartModal`.

#### Страницы и модальные окна
- **HomePage:** Главная страница с каталогом товаров и шапкой.
- **ProductCatalog:** Страница со списком всех доступных товаров. При клике на товар открывается `ProductDetailModal`.
- **ProductDetailModal:** Отображает подробную информацию о товаре с кнопкой "Добавить в корзину".
- **CartModal:** Отображает текущую корзину и содержит кнопку для перехода к оформлению заказа, открывая `PaymentAddressModal`.
- **PaymentAddressModal:** Позволяет выбрать способ оплаты и ввести адрес. При нажатии "Далее" открывается `ContactsModal`.
- **ContactsModal:** Форма для ввода телефона и email. При нажатии "Оплатить" открывается `OrderSuccessModal`.
- **OrderSuccessModal:** Подтверждает успешное оформление заказа. Кнопка "За новыми покупками" возвращает пользователя в каталог товаров.

