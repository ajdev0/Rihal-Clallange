import React from "react";

const Dashboard = () => {
  return (
    <div className="col-xl-3 col-md-6">
      <div className="card">
        <div className="card-block">
          <div className="row align-items-center">
            <div className="col-8">
              <h4 className="text-c-purple">$30200</h4>
              <h6 className="text-muted m-b-0">All Earnings</h6>
            </div>
            <div className="col-4 text-right">
              <i className="fa fa-bar-chart f-28"></i>
            </div>
          </div>
        </div>
        <div className="card-footer bg-c-purple">
          <div className="row align-items-center">
            <div className="col-9">
              <p className="text-white m-b-0">% change</p>
            </div>
            <div className="col-3 text-right">
              <i className="fa fa-line-chart text-white f-16"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
