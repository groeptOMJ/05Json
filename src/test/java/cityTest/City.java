package cityTest;

import static org.junit.Assert.fail;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;

import service.CityUtils;

public class City {
	private CityUtils util = new CityUtils();

	@Test
	public void test() {
		try {
			bean.City sf = util.getCity("San Francisco");
			JSONObject sfJSON = new JSONObject(sf);
			System.out.println("JSON version of SF is:\n" + sfJSON);
		} catch (Exception e) {
			fail("exception");
		}
	}

	@Test
	public void Test2() {
		try {
			List<bean.City> biggest = util.findCities("top-5-cities");
			JSONArray citiesJSON = new JSONArray(biggest);
			System.out.println("JSON version of biggest " + "US cities is:\n" + citiesJSON);
		} catch (Exception e) {
			fail("exception");
		}
	}

	@Test
	public void Test3() {
		try {
			Map<String, String[]> cities = util.getCityTypeMap();
			JSONObject citiesJSON = new JSONObject(cities);
			System.out.println("JSON version of map of " + "US cities is:\n" + citiesJSON);
		} catch (Exception e) {
			fail("exception");
		}
	}

}
