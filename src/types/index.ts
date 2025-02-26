/**
 * Товар, приходящий от API (например, в ответ на GET /product/)
 */
export interface IApiProduct {
    productId: string;
    productDescription: string;
    productImage: string;
    productTitle: string;
    productCategory: string;
    productPrice: number | null;
}

/**
 * Список товаров, возвращаемый с бэкенда
 */
export interface IApiProductList {
    totalCount: number;        // Общее количество товаров
    productItems: IApiProduct[]; // Массив товаров
}

/**
 * Товар, используемый внутри приложения (UI).
 */
export interface IProduct {
    productId: string;
    productDescription: string;
    productImage: string;
    productTitle: string;
    productCategory: string;
    productPrice: number | null;
}

/**
 * Данные покупателя, приходящие от API или отправляемые на бэкенд
 */
export interface IApiCustomerData {
    paymentMethod: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
}

/**
 * Данные покупателя внутри приложения (UI).
 */
export interface ICustomerData {
    paymentMethod: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
}

/**
 * Тело запроса для создания заказа (POST /order)
 */
export interface IApiOrderRequest {
    paymentMethod: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    orderTotal: number;       // общая сумма заказа
    productIds: string[];     // список ID товаров
}

/**
 * Ответ от сервера при успешном создании заказа
 */
export interface IApiOrderResponse {
    orderId: string;    // идентификатор созданного заказа
    confirmedTotal: number; // подтверждённая сумма заказа
}

/**
 * Структура ошибки при неудачном оформлении заказа (400 Bad Request)
 */
export interface IApiOrderError {
    errorMessage: string;
}

/**
 * Заказ, используемый внутри приложения (UI).
 */
export interface IOrder {
    orderedProducts: IProduct[];     // товары, добавленные в корзину
    customerInfo: ICustomerData; // данные покупателя
    orderTotal: number;            // итоговая сумма заказа
}