import { Link } from "react-router-dom";








function Information () {
  return (
    <div className="bg-light py-7">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 text-center">
            <h3>Lorem ipsum</h3>
            
            <p className="text-muted">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.</p>

            <Link to='productlist' className="btn btn-dark mt-4 rounded-0">前往產品總覽</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;