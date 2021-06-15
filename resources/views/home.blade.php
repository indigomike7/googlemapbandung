<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maps</title>
    <script src="{{ asset('js/app.js') }}" async defer></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.3.2/dist/chart.min.js"></script>
	<style>
	#divchart{
		display:none;
	}
	#divhide{
		display:none;
	}
	#divshow{
		display:block;
	}
	</style>
	<script type="text/javascript">
	function show() {
		var x = document.getElementById("divchart");
		var y = document.getElementById("divshow");
		var z = document.getElementById("divhide");
		x.style.display = "block";
		y.style.display = "none";
		z.style.display = "block";
	}
	function hide() {
		var x = document.getElementById("divchart");
		var y = document.getElementById("divshow");
		var z = document.getElementById("divhide");
		x.style.display = "none";
		y.style.display = "block";
		z.style.display = "none";
	}
	</script>
</head>
<body>
<?php if($posted==true){?>
<div id="divshow">
<a href="javascript:show();">Show Analytics</a>
</div>
<div id="divhide">
<a href="javascript:hide();">Hide Analytics</a>
</div>
<div id="divchart">
	<div style="float:left; width:20%;">
	<h1>Analisa berdasarkan Logo</h1><br/><br/>
	<canvas id="logoChart" width="200" height="200"></canvas>
	</div>
	<div style="float:left; width:20%;">
	<h1>Analisa berdasarkan Nomor Telepon</h1>
	<canvas id="phoneChart" width="200" height="200"></canvas>
	</div>
	<div style="float:left; width:20%;">
	<h1>Analisa berdasarkan Rate</h1><br/><br/>
	<canvas id="rateChart" width="200" height="200"></canvas>
	</div>
	<div style="float:left; width:20%;">
	<h1>Analisa berdasarkan Review</h1>
	<canvas id="reviewChart" width="200" height="200"></canvas>
	</div>
	<div style="float:left; width:20%;">
	<h1>Analisa berdasarkan Website</h1>
	<canvas id="webChart" width="200" height="200"></canvas>
	</div>
	<div style="clear:left;">
	</div>
</div>
<?php } ?>
    <div id="main" data-response="{{ $data }}" data-status="{{ $result }}"></main>

<script type="text/javascript">
var logoCanvas = document.getElementById("logoChart");
var barChart = new Chart(logoCanvas, {
  type: 'bar',
  data: {
    labels: ["Punya Logo", "Tidak punya Logo"],
    datasets: [{
      label: 'Count',
      data: [{{$count_with_logo}}, {{$count_without_logo}}],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ]
    }]
  }
});
var phoneCanvas = document.getElementById("phoneChart");
var barChart = new Chart(phoneCanvas, {
  type: 'bar',
  data: {
    labels: ["Punya Nomor Telepon", "Tidak punya Nomor Telepon"],
    datasets: [{
      label: 'Count',
      data: [{{$count_with_phone}}, {{$count_without_phone}}],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ]
    }]
  }
});
var rateCanvas = document.getElementById("rateChart");
var barChart = new Chart(rateCanvas, {
  type: 'bar',
  data: {
    labels: ["Punya Rate", "Tidak punya Rate"],
    datasets: [{
      label: 'Count',
      data: [{{$count_with_rate}}, {{$count_without_rate}}],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ]
    }]
  }
});
var reviewCanvas = document.getElementById("reviewChart");
var barChart = new Chart(reviewCanvas, {
  type: 'bar',
  data: {
    labels: ["Punya Review", "Tidak punya Review"],
    datasets: [{
      label: 'Count',
      data: [{{$count_with_review}}, {{$count_without_review}}],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ]
    }]
  }
});
var webCanvas = document.getElementById("webChart");
var barChart = new Chart(webCanvas, {
  type: 'bar',
  data: {
    labels: ["Punya Web", "Tidak punya Web"],
    datasets: [{
      label: 'Count',
      data: [{{$count_with_web}}, {{$count_without_web}}],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ]
    }]
  }
});
</script>
</body>
</html>