package com.POA.conserva_cidadao_app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import javax.sql.DataSource;
import java.sql.Connection;

@Component
public class DBValidator implements CommandLineRunner {

    private final DataSource dataSource;

    public DBValidator(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) throws Exception {
        try(Connection conn = dataSource.getConnection()) {
            System.out.println("Conexão com o banco estabelecida!");
        } catch (Exception e) {
            System.err.println("Falha na conexão com o banco:");
            e.printStackTrace();
        }
    }
}