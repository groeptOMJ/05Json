package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;

import service.CityUtils;
import bean.City;

@WebServlet("/show-cities-3")
public class ShowCities3 extends HttpServlet {
	protected CityUtils util = new CityUtils();

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "no-cache");
		response.setContentType("text/javascript");
		List<City> cities = getCities(request);
		PrintWriter out = response.getWriter();
		out.println(new JSONArray(cities));
	}

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	private List<City> getCities(HttpServletRequest request) {
		String cityNames = request.getParameter("cityNames");
		if ((cityNames == null) || (cityNames.trim().equals(""))) {
			cityNames = "['New York', 'Los Angeles]";
		}
		try {
			JSONArray jsonCityNames = new JSONArray(cityNames);
			List<City> cities = new ArrayList<City>();
			for (int i = 0; i < jsonCityNames.length(); i++) {
				City city = util.getCityOrDefault(jsonCityNames.getString(i));
				cities.add(city);
			}
			return (cities);
		} catch (JSONException jse) {
			return (util.findCities("top-5-cities"));
		}
	}

}
