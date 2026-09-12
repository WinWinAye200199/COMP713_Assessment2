package com.comp713.grocery_ordering_api.service;

import com.comp713.grocery_ordering_api.dto.OrderRequest;
import com.comp713.grocery_ordering_api.entity.Customer;
import com.comp713.grocery_ordering_api.entity.Order;
import com.comp713.grocery_ordering_api.entity.Product;
import com.comp713.grocery_ordering_api.exception.ResourceNotFoundException;
import com.comp713.grocery_ordering_api.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerService customerService;
    private final ProductService productService;

    @Autowired
    public OrderService(OrderRepository orderRepository,
                        CustomerService customerService,
                        ProductService productService) {
        this.orderRepository = orderRepository;
        this.customerService = customerService;
        this.productService = productService;
    }

    public Order createOrder(OrderRequest request) {
        Customer customer = customerService.getCustomerById(request.getCustomerId());
        Product product = productService.getProductById(request.getProductId());

        Order order = new Order(customer, product, request.getQuantity());
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }
}