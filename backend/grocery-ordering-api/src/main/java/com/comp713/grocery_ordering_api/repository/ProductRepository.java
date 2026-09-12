package com.comp713.grocery_ordering_api.repository;

import com.comp713.grocery_ordering_api.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}