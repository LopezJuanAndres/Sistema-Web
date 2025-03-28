# Usar una imagen base de Ubuntu
FROM ubuntu:20.04

# Configurar argumentos para prevenir prompts interactivos durante la instalación
ARG DEBIAN_FRONTEND=noninteractive

# Actualizar el sistema y instalar paquetes LAMP
RUN apt-get update && \
    apt-get install -y apache2 mysql-server php php-mysql libapache2-mod-php && \
    apt-get clean

# Copiar archivos de configuración personalizados si es necesario
COPY ./my_apache_config.conf /etc/apache2/sites-available/000-default.conf

# Configurar servicios para que estén listos
RUN service apache2 start && service mysql start

# Exponer el puerto 80 para Apache
EXPOSE 80

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar el código del proyecto al contenedor
COPY ./app/Sistema-web /var/www/html/

# Comando para ejecutar Apache en primer plano
CMD ["apachectl", "-D", "FOREGROUND"]
