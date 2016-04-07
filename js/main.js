var app = angular.module("MyApp", []);


app.controller("SkillsCtrl", function($scope, $http){
	
	$scope.loading = true;
	$scope.skills = false;
	
	// ->Servicio rest desde Codeigniter
	$http.get('http://www.jose-osorio.com/api/index.php/rest/Habilidades_Rest/Habilidades/format.json')
		.success(function(data, status, headers, config){
			var cont = 1;
			var data_t0 = [];
			var data_t1 = [];
			angular.forEach(data, function(value, key){
				if(value.tipo == 0){
					data_t0.push(value);
				}
				if(value.tipo == 1){
					data_t1.push(value);	
				}
			});

			var skill_t0_arr_p = [];
			var skill_t0_arr_h = [];
			var cant_datos_t0 = data_t0.length - 1;

			var skill_t1_arr_p = [];
			var skill_t1_arr_h = [];
			var cant_datos_t1 = data_t1.length - 1;
			
			// Each que divide las habilidades t0 en bloques de 4 en 4
			angular.forEach(data_t0, function(value, key){
				skill_t0_arr_h.push(value);	
				if(cont == 4)
				{
					cont = 1;
					skill_t0_arr_p.push(skill_t0_arr_h);
					skill_t0_arr_h = [];					
				}
				else
				{
					cont++;
				}
				if(cant_datos_t0 == key && skill_t0_arr_h.length >= 1){
					skill_t0_arr_p.push(skill_t0_arr_h);
				}
			});

			// Each que divide las habilidades t1 en bloques de 2 en 2
			cont = 1;
			angular.forEach(data_t1, function(value, key){
				skill_t1_arr_h.push(value);	
				if(cont == 2)
				{
					cont = 1;
					skill_t1_arr_p.push(skill_t1_arr_h);
					skill_t1_arr_h = [];					
				}
				else
				{
					cont++;
				}
				if(cant_datos_t1 == key && skill_t1_arr_h.length >= 1){
					skill_t1_arr_p.push(skill_t1_arr_h);
				}
			});

			$scope.skills_t0 = skill_t0_arr_p;
			$scope.skills_t1 = skill_t1_arr_p;
		})
		.error(function(data, status, headers, config){
			console.log("Error en la consulta.");
		})
		.finally(function (){
			// Termina el proceso de la consulta
			$scope.loading = false;
			$scope.skills = true;
		});
});