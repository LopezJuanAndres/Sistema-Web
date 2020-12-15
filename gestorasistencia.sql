-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 15-12-2020 a las 15:10:06
-- Versión del servidor: 5.7.15-log
-- Versión de PHP: 5.6.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestorasistencia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `IdAlumno` int(11) NOT NULL,
  `Nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Apellido` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Documento` int(75) NOT NULL,
  `Telefono` int(100) NOT NULL,
  `Dirreccion` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Correo` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`IdAlumno`, `Nombre`, `Apellido`, `Documento`, `Telefono`, `Dirreccion`, `Correo`) VALUES
(5, 'pedro', 'rodriguez', 34221332, 4325432, 'callejon 3322', 'pedro@gmail.com'),
(6, 'Martin', 'Ferreira', 34567865, 4563223, 'frsncia 4333', 'Martin@gmail.com'),
(7, 'Matias', 'Gimenez', 34564123, 4765446, 'españa 5674', 'Matias@gmail.com'),
(9, 'Lucas', 'Maidana', 35432123, 4567898, 'freire 3222', 'Lucas@gmail.com'),
(10, 'Gabriel', 'Pereira', 34221222, 4532332, 'francia 8765', 'Gabriel@gmail.com'),
(11, 'Lucas', 'Pereira', 34221222, 4532332, 'French 3211', 'Gabriel@gmail.com'),
(14, 'Jose', 'Martinez', 2345621, 4332222, 'gorostiaga 3222', 'Jose@gmail.com'),
(17, 'Carlos', 'Maidana', 32111222, 34252222, 'pedro centeno 2222', 'carlosmaidana@gmail.com'),
(21, 'gabriel', 'Ferraro', 39876563, 4765432, 'gaboto 3788', 'gabriel@gmail.com'),
(22, 'Hugo', 'Prueba', 35643222, 156789765, 'gaboto 6633', 'Hugo@gmail.com'),
(24, 'Matias', 'Vallejos', 40897654, 156789654, 'gaboto 3622', 'MatiasVallejos@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `IdAlumno` int(11) NOT NULL,
  `IdClase` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`IdAlumno`, `IdClase`) VALUES
(6, 4),
(10, 4),
(6, 5),
(10, 5),
(14, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `IdClase` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `IdMateria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`IdClase`, `Fecha`, `Descripcion`, `IdMateria`) VALUES
(1, '2020-12-10', 'Examen', 3),
(2, '2020-12-15', 'Examen final', 4),
(3, '2020-12-09', 'teorema de gaus', 3),
(4, '2020-12-09', 'teorema de gaus', 3),
(5, '2020-12-17', 'casos de factoreo', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `ID` int(11) NOT NULL,
  `Usuario` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Contraseña` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Nombre` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Apellido` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `Correo` varchar(60) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`ID`, `Usuario`, `Contraseña`, `Nombre`, `Apellido`, `Correo`) VALUES
(12, 'admin', 'admin', 'Administrador', 'Sistemas', 'Administrador@Sistemas.com'),
(13, 'Profesor', 'Profesor', 'Fabian', 'Aguilar', 'Fabian.Aguilar@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `IdMateria` int(11) NOT NULL,
  `Asignatura` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Division` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `IdProfesor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`IdMateria`, `Asignatura`, `Division`, `IdProfesor`) VALUES
(1, 'Administracion', '3ero', 12),
(2, 'Administracion', '4º "B"', 12),
(3, 'Matematicas', '5º "C"', 13),
(4, 'Matematicas', '2º "A"', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiasalumnos`
--

CREATE TABLE `materiasalumnos` (
  `IdAlumno` int(11) NOT NULL,
  `IdMateria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `materiasalumnos`
--

INSERT INTO `materiasalumnos` (`IdAlumno`, `IdMateria`) VALUES
(5, 1),
(6, 3),
(7, 2),
(9, 4),
(10, 3),
(11, 1),
(14, 3),
(24, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`IdAlumno`);

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`IdAlumno`,`IdClase`),
  ADD KEY `IdClase` (`IdClase`);

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`IdClase`),
  ADD KEY `IdMateria` (`IdMateria`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`IdMateria`),
  ADD KEY `IdProfesor` (`IdProfesor`) USING BTREE;

--
-- Indices de la tabla `materiasalumnos`
--
ALTER TABLE `materiasalumnos`
  ADD KEY `Alumno/Materia` (`IdAlumno`,`IdMateria`),
  ADD KEY `IdMateria` (`IdMateria`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `IdAlumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `IdClase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `IdMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `asistencia_ibfk_2` FOREIGN KEY (`IdAlumno`) REFERENCES `alumnos` (`IdAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asistencia_ibfk_3` FOREIGN KEY (`IdClase`) REFERENCES `clases` (`IdClase`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `clases`
--
ALTER TABLE `clases`
  ADD CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`IdMateria`) REFERENCES `materias` (`IdMateria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `materias`
--
ALTER TABLE `materias`
  ADD CONSTRAINT `materias_ibfk_1` FOREIGN KEY (`IdProfesor`) REFERENCES `login` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `materiasalumnos`
--
ALTER TABLE `materiasalumnos`
  ADD CONSTRAINT `materiasalumnos_ibfk_1` FOREIGN KEY (`IdAlumno`) REFERENCES `alumnos` (`IdAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `materiasalumnos_ibfk_2` FOREIGN KEY (`IdMateria`) REFERENCES `materias` (`IdMateria`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
