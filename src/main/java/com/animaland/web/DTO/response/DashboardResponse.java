package com.animaland.web.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {
    private long owners;
    private long employees;
    private long appointments;
    private long treatments;
}