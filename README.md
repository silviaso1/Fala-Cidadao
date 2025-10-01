<p align="center">
  <img src="https://github.com/user-attachments/assets/5765d439-7fc3-473b-928e-512e93d9ee11" alt="logo" />
</p>

<h3 align="center">Versão em Português</h3>

## Sobre o Fala Cidadão

O Fala Cidadão, inicialmente chamado de *Conserva Cidadão*, é uma plataforma em formato de rede social desenvolvida para promover a interação entre cidadãos e órgãos públicos. A aplicação permite que os usuários registrem denúncias — com ou sem uso do mapa —, acompanhem o andamento de suas solicitações e colaborem ativamente para o desenvolvimento e bem-estar da cidade. Por meio de uma interface acessível e interativa, o sistema busca fortalecer a participação cidadã e tornar a gestão pública mais transparente e eficiente.


## Estrutura do Projeto

### BackEnd
```bash
BackEnd
 ├── conserva-cidadao-app
 │  ├── mvnw
 │  ├── ├── mvn-wrapper
 │  │       └── mvn-wrapper.properties
 │  ├── pom.xml
 │  ├── src
 │  │   ├── main
 │  │   │   ├── java
 │  │   │   │   └── com
 │  │   │   │       └── POA
 │  │   │   │           └── conserva_cidadao_app
 │  │   │   │               ├── ConservaCidadaoAppApplication.java
 │  │   │   │               ├── config
 │  │   │   │               │   └── CorsConfig.java
 │  │   │   │               ├── controller
 │  │   │   │               │   ├── AuthController.java
 │  │   │   │               │   ├── ComentarioController.java
 │  │   │   │               │   ├── DenunciaController.java
 │  │   │   │               │   ├── GeolocalizacaoController.java
 │  │   │   │               │   ├── LikeController.java
 │  │   │   │               │   ├── LocalController.java
 │  │   │   │               │   └── StatusController.java
 │  │   │   │               ├── data
 │  │   │   │               │   ├── ComentarioResponseDTO.java
 │  │   │   │               │   ├── DenunciaRequestDTO.java
 │  │   │   │               │   ├── DenunciaResponseDTO.java
 │  │   │   │               │   ├── LikeDTO.java
 │  │   │   │               │   ├── LocalDTO.java
 │  │   │   │               │   └── UsuarioResponseDTO.java
 │  │   │   │               ├── model
 │  │   │   │               │   ├── Comentario.java
 │  │   │   │               │   ├── Denuncia.java
 │  │   │   │               │   ├── Like.java
 │  │   │   │               │   ├── Local.java
 │  │   │   │               │   ├── StatusDenuncia.java
 │  │   │   │               │   └── Usuario.java
 │  │   │   │               ├── repository
 │  │   │   │               │   ├── ComentarioRepository.java
 │  │   │   │               │   ├── DenunciaRepository.java
 │  │   │   │               │   ├── LikeRepository.java
 │  │   │   │               │   ├── LocalRepository.java
 │  │   │   │               │   └── UsuarioRepository.java
 │  │   │   │               └── service
 │  │   │   │                   ├── ConservaCidadaoAppApplication.java
 │  │   │   │                   └── DBValidator.java
 │  │   │   └── resources
 │  │            ├── application.properties
 │  └── mvnw
 │  └── mvnw.cmd
 │  └── pom.xml
      
      
      
```

### FrontEnd

```bash

frontend
├── node_modules/              
├── src/
│   ├── assets/              
│   │   ├── logo.png
│   ├── components/            
│   │   ├── Admin/
│   │   │   ├── Charts/
│   │   │   ├── Pagination/
│   │   │   ├── Reports/
│   │   │   └── Stats/
│   │   ├── ComplaintPage/
│   │   │   ├── Actions/
│   │   │   ├── Buttons/
│   │   │   ├── Comment/
│   │   │   ├── Data/
│   │   │   ├── Dropdown/
│   │   │   ├── FormComment/
│   │   │   ├── Map/
│   │   │   ├── Modal/
│   │   │   ├── Posts/
│   │   │   ├── Search/
│   │   │   ├── Sidebar/
│   │   │   └── TopNav/
│   │   ├── HomePage/
│   │   └── ProtectedRoute/
│   ├── contexts/
│   │   └── Auth/
│   ├── pages/
│   │   ├── Admin/
│   │   ├── Auth/
│   │   ├── Complaint/
│   │   ├── Home/
│   │   └── NotFound/
│   ├── App.jsx                
│   ├── main.jsx               
├── .env                      
├── index.html
├── package-lock.json
├── package.json


```

## Perfis de Acesso

A plataforma Fala Cidadão possui dois tipos principais de usuários, cada um com permissões específicas:

### Usuário 

- Pode registrar denúncias 
- Acompanha o status das denúncias que realizou
- Comenta e interage em denúncias públicas
- Edita suas informações de login
- Pode buscar por uma denúncia específica

### Administrador 

- Visualiza todas as denúncias detalhadamente
- Atualiza o status das denúncias (em análise e resolvido)
- Visualiza relatórios em dashboard
- Filtra status
- Pode buscar por uma denúncia específica
- Exclui denúncias e analisa conteúdo impróprio


## Próximas Implementações

- Sistema de notificações
- Filtro de data 
- Suporte a múltiplas cidades (atualmente a API não filtra praças e parques fora do Rio de Janeiro, no entanto corresponde a busca de CEP ou qualquer endereço existente no mundo)

## Tecnologias Usadas

### Front-end
| Tecnologia | Finalidade | Documentação |
|------------|-----------|--------------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | Biblioteca para interface do usuário | [Docs](https://reactjs.org/) |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) | Cliente HTTP | [Docs](https://axios-http.com/) |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) | Framework CSS | [Docs](https://getbootstrap.com/) |
| ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) | Pré-processador CSS | [Docs](https://sass-lang.com/) |

### Back-end
| Tecnologia | Finalidade | Documentação |
|------------|-----------|--------------|
| ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) | Linguagem principal | [Docs](https://www.oracle.com/java/) |
| ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white) | Framework | [Docs](https://spring.io/projects/spring-boot) |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) | Banco de dados | [Docs](https://www.postgresql.org/) |
| ![Maven](https://img.shields.io/badge/Apache_Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white) | Ferramenta de build | [Docs](https://maven.apache.org/) |

##  Pré-requisitos

### Globais
| Ferramenta | Guia de Instalação |
|-----------|--------------------|
| ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) | [Download Git](https://git-scm.com/downloads) |

### Front-end
| Ferramenta | Versão | Instalação |
|-----------|--------|------------|
| ![Node.js](https://img.shields.io/badge/Node.js-18_LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | ≥18.x | [Guia](https://nodejs.org/en/download/) |
| ![npm](https://img.shields.io/badge/npm-9+-CB3837?style=for-the-badge&logo=npm&logoColor=white) | ≥9.x | Incluído com Node.js |

### Back-end
| Ferramenta | Versão | Instalação |
|-----------|--------|------------|
| ![JDK](https://img.shields.io/badge/Java_JDK-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) | 17 | [Download JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql&logoColor=white) | 16 | [Guia de Instalação](https://www.postgresql.org/download/) |

## Como instalar e executar o projeto

### 1. Clonando o repositório
```bash
git clone https://github.com/TheBestGekyume/ConservaCidadao.git
cd ConservaCidadao
```

### 2. Instalando as dependências

```bash
cd FrontEnd
npm install
npm install chart.js 
```

### 3. Iniciando o FrontEnd

``` bash
npm run dev
```

### 4. Crie um .env dentro do diretório Frontend com sua KEY da API do Google Maps
```env
VITE_GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI
```

### 5. Crie o application.properties com o seguinte conteúdo no Backend

Crie um arquivo em `src/main/resources/application.properties` com as seguintes chaves (valores reais devem ser preenchidos por você):

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

server.port=3001

spring.main.allow-bean-definition-overriding=true
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults=false
spring.jackson.serialization.WRITE_DATES_AS_TIMESTAMPS=false
spring.jackson.date-format=yyyy-MM-dd'T'HH:mm:ss.SSSXXX

spring.mvc.allow-credentials=true
spring.security.cors.enabled=false
spring.jpa.properties.hibernate.enable_collection_fetch=true

google.geocoding.api.key=SUA_CHAVE_GOOGLE_API
google.geocoding.url=https://maps.googleapis.com/maps/api/geocode/json
```

## Criadores

<div align="center">

[![Silvia](https://img.shields.io/badge/Silvia-Profile-%23782BF1?style=for-the-badge&logo=github&logoColor=white)](https://github.com/silviaso1)
[![Gekyume](https://img.shields.io/badge/Gekyume-Profile-%2300ACEE?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TheBestGekyume)
[![Tallyson](https://img.shields.io/badge/Tallyson-Profile-%23FF4500?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tallyson95)
[![Jonathan](https://img.shields.io/badge/Jonathan-Profile-%2342B983?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Jojobms)

</div>


<h3 align="center">English Version</h3>

## About Fala Cidadão

Fala Cidadão, initially named *Conserva Cidadão*, is a social media-style platform developed to promote interaction between citizens and public agencies. The application allows users to register complaints - with or without using the map - track the progress of their requests, and actively collaborate for city development and well-being. Through an accessible and interactive interface, the system aims to strengthen citizen participation and make public management more transparent and efficient.


## Project Structure

### BackEnd
```bash
BackEnd
 ├── conserva-cidadao-app
 │  ├── mvnw
 │  ├── ├── mvn-wrapper
 │  │       └── mvn-wrapper.properties
 │  ├── pom.xml
 │  ├── src
 │  │   ├── main
 │  │   │   ├── java
 │  │   │   │   └── com
 │  │   │   │       └── POA
 │  │   │   │           └── conserva_cidadao_app
 │  │   │   │               ├── ConservaCidadaoAppApplication.java
 │  │   │   │               ├── config
 │  │   │   │               │   └── CorsConfig.java
 │  │   │   │               ├── controller
 │  │   │   │               │   ├── AuthController.java
 │  │   │   │               │   ├── ComentarioController.java
 │  │   │   │               │   ├── DenunciaController.java
 │  │   │   │               │   ├── GeolocalizacaoController.java
 │  │   │   │               │   ├── LikeController.java
 │  │   │   │               │   ├── LocalController.java
 │  │   │   │               │   └── StatusController.java
 │  │   │   │               ├── data
 │  │   │   │               │   ├── ComentarioResponseDTO.java
 │  │   │   │               │   ├── DenunciaRequestDTO.java
 │  │   │   │               │   ├── DenunciaResponseDTO.java
 │  │   │   │               │   ├── LikeDTO.java
 │  │   │   │               │   ├── LocalDTO.java
 │  │   │   │               │   └── UsuarioResponseDTO.java
 │  │   │   │               ├── model
 │  │   │   │               │   ├── Comentario.java
 │  │   │   │               │   ├── Denuncia.java
 │  │   │   │               │   ├── Like.java
 │  │   │   │               │   ├── Local.java
 │  │   │   │               │   ├── StatusDenuncia.java
 │  │   │   │               │   └── Usuario.java
 │  │   │   │               ├── repository
 │  │   │   │               │   ├── ComentarioRepository.java
 │  │   │   │               │   ├── DenunciaRepository.java
 │  │   │   │               │   ├── LikeRepository.java
 │  │   │   │               │   ├── LocalRepository.java
 │  │   │   │               │   └── UsuarioRepository.java
 │  │   │   │               └── service
 │  │   │   │                   ├── ConservaCidadaoAppApplication.java
 │  │   │   │                   └── DBValidator.java
 │  │   │   └── resources
 │  │            ├── application.properties
 │  └── mvnw
 │  └── mvnw.cmd
 │  └── pom.xml
```
### FrontEnd

```bash

frontend
├── node_modules/              
├── src/
│   ├── assets/              
│   │   ├── logo.png
│   ├── components/            
│   │   ├── Admin/
│   │   │   ├── Charts/
│   │   │   ├── Pagination/
│   │   │   ├── Reports/
│   │   │   └── Stats/
│   │   ├── ComplaintPage/
│   │   │   ├── Actions/
│   │   │   ├── Buttons/
│   │   │   ├── Comment/
│   │   │   ├── Data/
│   │   │   ├── Dropdown/
│   │   │   ├── FormComment/
│   │   │   ├── Map/
│   │   │   ├── Modal/
│   │   │   ├── Posts/
│   │   │   ├── Search/
│   │   │   ├── Sidebar/
│   │   │   └── TopNav/
│   │   ├── HomePage/
│   │   └── ProtectedRoute/
│   ├── contexts/
│   │   └── Auth/
│   ├── pages/
│   │   ├── Admin/
│   │   ├── Auth/
│   │   ├── Complaint/
│   │   ├── Home/
│   │   └── NotFound/
│   ├── App.jsx                
│   ├── main.jsx               
├── .env                      
├── index.html
├── package-lock.json
├── package.json
```

## Access Profiles


### Regular User

- Can register complaints
- Tracks the status of their submitted complaints
- Comments and interacts with public complaints
- Edits their login information
- Can search for specific complaints

### Administrator
- Views all complaints in detail
- Updates complaint status (under review and resolved)
- Views dashboard reports
- Filters by status
- Can search for specific complaints
- Deletes complaints and reviews inappropriate content

## Upcoming Features

- Notification system
- Date filter
- Multi-city support (currently the API doesn't filter squares and parks outside Rio de Janeiro, but can search by ZIP code or any existing address worldwide)


##  Technologies

### Front-end
| Technology | Purpose | Docs |
|------------|---------|------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | UI Library | [Docs](https://reactjs.org/) |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) | HTTP Client | [Docs](https://axios-http.com/) |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) | CSS Framework | [Docs](https://getbootstrap.com/) |
| ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) | CSS Preprocessor | [Docs](https://sass-lang.com/) |

### Back-end
| Technology | Purpose | Docs |
|------------|---------|------|
| ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) | Core Language | [Docs](https://www.oracle.com/java/) |
| ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white) | Framework | [Docs](https://spring.io/projects/spring-boot) |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) | Database | [Docs](https://www.postgresql.org/) |
| ![Maven](https://img.shields.io/badge/Apache_Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white) | Build Tool | [Docs](https://maven.apache.org/) |

##  Prerequisites

### Global
| Tool | Installation Guide |
|------|--------------------|
| ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) | [Download Git](https://git-scm.com/downloads) |

### Front-end
| Tool | Version | Installation |
|------|---------|--------------|
| ![Node.js](https://img.shields.io/badge/Node.js-18_LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | ≥18.x | [Guide](https://nodejs.org/en/download/) |
| ![npm](https://img.shields.io/badge/npm-9+-CB3837?style=for-the-badge&logo=npm&logoColor=white) | ≥9.x | Included with Node.js |

### Back-end
| Tool | Version | Installation |
|------|---------|--------------|
| ![JDK](https://img.shields.io/badge/Java_JDK-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) | 17 | [Download JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql&logoColor=white) | 16 | [Install Guide](https://www.postgresql.org/download/) |


## How to Install and Run the Project

### 1. Cloning the repository
```bash

git clone https://github.com/TheBestGekyume/ConservaCidadao.git
cd ConservaCidadao

```
### 2.Installing dependencies

```bash
cd FrontEnd
npm install
npm install chart.js
```

### 3.Starting the FrontEnd

```bash
npm run dev
```

### 4. Create a .env file in the Frontend directory with your Google Maps API KEY

```env
VITE_GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
```

### 5.Create the application.properties file in the Backend
Create a file at src/main/resources/application.properties with the following keys (real values should be filled by you):

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

server.port=3001

spring.main.allow-bean-definition-overriding=true
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults=false
spring.jackson.serialization.WRITE_DATES_AS_TIMESTAMPS=false
spring.jackson.date-format=yyyy-MM-dd'T'HH:mm:ss.SSSXXX

spring.mvc.allow-credentials=true
spring.security.cors.enabled=false
spring.jpa.properties.hibernate.enable_collection_fetch=true

google.geocoding.api.key=YOUR_GOOGLE_API_KEY
google.geocoding.url=https://maps.googleapis.com/maps/api/geocode/json

```

## Creators

<div align="center">

[![Silvia](https://img.shields.io/badge/Silvia-Profile-%23782BF1?style=for-the-badge&logo=github&logoColor=white)](https://github.com/silviaso1)
[![Gekyume](https://img.shields.io/badge/Gekyume-Profile-%2300ACEE?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TheBestGekyume)
[![Tallyson](https://img.shields.io/badge/Tallyson-Profile-%23FF4500?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tallyson95)
[![Jonathan](https://img.shields.io/badge/Jonathan-Profile-%2342B983?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Jojobms)

</div>





