<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class HomeController extends Controller
{
    public function index() {
        $data = '[]';
        $result = '';
		$posted=false;
		$count_with_phone=0;
		$count_without_phone=0;
		$count_with_web=0;
		$count_without_web=0;
		$count_with_logo=0;
		$count_without_logo=0;
		$count_with_rate=0;
		$count_without_rate=0;
		$count_with_review=0;
		$count_without_review=0;
            return view('home', compact('data','result','count_with_logo','count_without_logo','count_with_phone','count_without_phone','count_with_rate','count_without_rate','count_with_review','count_without_review','count_with_web','count_without_web','posted'));
    }

    public function scrape($keyword) {
		$insertstat=false;
		$searchattempt=null;
		$count_with_phone=0;
		$count_without_phone=0;
		$count_with_web=0;
		$count_without_web=0;
		$count_with_logo=0;
		$count_without_logo=0;
		$count_with_rate=0;
		$count_without_rate=0;
		$count_with_review=0;
		$count_without_review=0;
		$posted=false;
		$sa_id=0;
        try {
            if (!$keyword) abort(404);
			$posted = true;
			$searchattempt = DB::table('searchattempt')->where('keyword', $keyword)->first();
			if(!isset($searchattempt->keyword))
			{
				$sa_id=DB::table('searchattempt')->insertGetId([
					'keyword' => $keyword,
					'dateattempt' => date("Y-m-d  H:i:s")
				]);
				$insertstat=true;
			}
			else
			{
				$sa_id = $searchattempt->id;
			}
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://www.google.com/search?tbm=map&authuser=0&hl=en&gl=us&pb=!4m12!1m3!1d14005.206834501354!2d107.56235035!3d-6.9815467!2m3!1f0!2f0!3f0!3m2!1i1440!2i679!4f13.1!7i20!10b1!12m8!1m1!18b1!2m3!5m1!6e2!20e3!10b1!16b1!19m4!2m3!1i360!2i120!4i8!20m65!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m50!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e3!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e3!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!2b1!4b1!9b0!22m5!1sO89lYLmEHYLf9QOuvJLIAQ!4m1!2i5361!7e81!12e3!24m54!1m16!13m7!2b1!3b1!4b1!6i1!8b1!9b1!20b0!18m7!3b1!4b1!5b1!6b1!9b1!13b0!14b0!2b1!5m5!2b1!3b1!5b1!6b1!7b1!10m1!8e3!14m1!3b1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!29b1!30m1!2b1!36b1!43b1!52b1!54m1!1b1!55b1!56m2!1b1!3b1!65m5!3m4!1m3!1m2!1i224!2i298!89b1!26m4!2m3!1i80!2i92!4i8!30m28!1m6!1m2!1i0!2i0!2m2!1i458!2i679!1m6!1m2!1i1390!2i0!2m2!1i1440!2i679!1m6!1m2!1i0!2i0!2m2!1i1440!2i20!1m6!1m2!1i0!2i659!2m2!1i1440!2i679!34m16!2b1!3b1!4b1!6b1!8m4!1b1!3b1!4b1!6b1!9b1!12b1!14b1!20b1!23b1!25b1!26b1!37m1!1e81!42b1!47m0!49m1!3b1!50m4!2e2!3m2!1b1!3b1!65m0!69i547&q=".urlencode($keyword),
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET"
            ));
              
            $response = curl_exec($curl);
            
            curl_close($curl);
            
            $response = substr($response,4,-1);
            $response = str_replace("null,",'"",',$response);
            $data = json_decode($response,1);
            $arr = [];
            if(isset($data[0][1])) {
				/* START LOOP */
                foreach($data[0][1] as $single) {
                    if(isset($single[14])) {
                        $result = $single[14];
                        $temparr = [];
                        $temparr['name'] = isset($result[11]) ? $result[11] : "";
                        $temparr['location'] = isset($result[18]) ? $result[18] : "";
                        $temparr['phone'] = isset($result[178][0][0]) ? $result[178][0][0] : "";
                        $temparr['lat'] = isset($result[9][2]) ? $result[9][2] : "";
                        $temparr['lng'] = isset($result[9][3]) ? $result[9][3] : "";
                        $temparr['web'] = isset($result[7][1]) ? $result[7][1] : "";
                        $temparr['logo'] = isset($result[157]) ? $result[157] : "";
                        $temparr['jadwal'] = isset($result[34][1]) ? $result[34][1] : [];
                        $temparr['rate'] = isset($result[4][7]) ? $result[4][7] : "";
                        $temparr['review'] = isset($result[4][8]) ? $result[4][8] : "";
                        $arr[] = $temparr;
						
						/* WITH PHONE DATA */
						if(trim($temparr['phone'])=="")
						{
							$count_without_phone++;
						}
						else
						{
							$count_with_phone++;
						}
						/* EOF WITH PHONE DATA */

						/* WITH WEBSITE DATA */
						if(trim($temparr['web'])=="")
						{
							$count_without_web++;
						}
						else
						{
							$count_with_web++;
						}
						/* EOF WITH WEBSITE DATA */
						
						/* WITH LOGO DATA */
						if(trim($temparr['logo'])=="")
						{
							$count_without_logo++;
						}
						else
						{
							$count_with_logo++;
						}
						/* EOF WITH LOGO DATA */

						/* WITH RATE DATA */
						if(trim($temparr['rate'])=="")
						{
							$count_without_rate++;
						}
						else
						{
							$count_with_rate++;
						}
						/* EOF WITH RATE DATA */


						/* WITH REVIEW DATA */
						if(trim($temparr['review'])=="")
						{
							$count_without_review++;
						}
						else
						{
							$count_with_review++;
						}
						/* EOF WITH REVIEW DATA */

						//var_dump($temparr);
						
						if($insertstat==true)
						{
							/* INSERT TO DB */
							DB::table('searchattempt_detail')->insert([
							'sa_id' => $sa_id,
							'name' => $temparr['name'],
							'location' => $temparr['location'],
							'phone' => $temparr['phone'],
							'lat' => $temparr['lat'],
							'lng' => $temparr['lng'],
							'web' => $temparr['web'],
							'logo' => $temparr['logo'],
							'jadwal' => json_encode($temparr['jadwal']),
							'rate' => $temparr['rate'],
							'review' => $temparr['review']
							]);
						}

						/* EOF INSERT TO DB */

                    }
                }
				/* EOF LOOP */
            }
			$analytics=array();
			$analytics[]=$arr;
			$analytics=array(
			'count_with_logo'=>$count_with_logo,
			'count_with_phone'=>$count_with_phone,
			'count_with_rate'=>$count_with_rate,
			'count_with_review'=>$count_with_review,
			'count_with_web'=>$count_with_web,
			'count_without_logo'=>$count_without_logo,
			'count_without_phone'=>$count_without_phone,
			'count_without_rate'=>$count_without_rate,
			'count_without_review'=>$count_without_review,
			'count_without_web'=>$count_without_web,
			);
			
            $data = json_encode($arr);
			//$data2 = json_encode($analytics);
            $result = 'true';
            return view('home', compact('data','result','count_with_logo','count_without_logo','count_with_phone','count_without_phone','count_with_rate','count_without_rate','count_with_review','count_without_review','count_with_web','count_without_web','posted'));
            // dd($arr);
        } catch (\Exception $e) {
            //abort(500);
            echo $e;
        }
    }
}