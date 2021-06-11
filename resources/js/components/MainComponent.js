import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ResultComponent from "./ResultComponent";

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            isLoading: false,
            response: [],
        };
        this.handleScrape = this.handleScrape.bind(this);
    }

    handleScrape() {
        if (this.state.keyword) {
            window.location.href =
                "search/" + encodeURIComponent(this.state.keyword);
        } else {
            alert("Keyword required...");
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-xl-8 offset-xl-2">
                        <div className="form-group">
                            <label>Kata Kunci</label>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.keyword}
                                placeholder="Masukkan kata kunci..."
                                onChange={(e) =>
                                    this.setState({ keyword: e.target.value })
                                }
                                onKeyPress={(e) => {
                                    if (
                                        e.key === "Enter" ||
                                        e.keyCode === 13 ||
                                        e.charCode === 13
                                    ) {
                                        this.handleScrape();
                                    }
                                }}
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            id="submit"
                            onClick={this.handleScrape}
                        >
                            Submit
                        </button>
                        {this.props.status ? (
                            <ResultComponent
                                data={JSON.parse(this.props.response)}
                            />
                        ) : null}
						<canvas id="popChart" width="200" height="200"></canvas>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainComponent;

if (document.getElementById("main")) {
    const propsContainer = document.getElementById("main");
    const props = Object.assign({}, propsContainer.dataset);

    ReactDOM.render(
        <MainComponent {...props} />,
        document.getElementById("main")
    );
}
var popCanvas = document.getElementById("popChart");
var barChart = new Chart(popCanvas, {
  type: 'bar',
  data: {
    labels: ["China", "India", "United States", "Indonesia", "Brazil", "Pakistan", "Nigeria", "Bangladesh", "Russia", "Japan"],
    datasets: [{
      label: 'Population',
      data: [1379302771, 1281935911, 326625791, 260580739, 207353391, 204924861, 190632261, 157826578, 142257519, 126451398],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ]
    }]
  }
});
