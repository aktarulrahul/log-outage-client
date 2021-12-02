import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Chart from './Chart';
const DataGraph = ({ isStateChange }) => {
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const applicationArr = [];
  useEffect(() => {
    fetch('https://log-outage.herokuapp.com/logs')
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        const newGraphData = [];
        for (let applicationName of data) {
          applicationArr.push(applicationName.name);
        }
        const uniqueApplication = [...new Set(applicationArr)];
        for (let applicationName of uniqueApplication) {
          const graphItem = data.filter(
            (item) => item.name === applicationName
          );
          // console.log('for ', graphItem[0].name);
          let totalTime = '00:00:00';
          for (let item of graphItem) {
            // console.log(item.loginTime, item.logoutTime);
            const diffTime = moment(
              moment(item.logoutTime, 'HH:mm:ss').diff(
                moment(item.loginTime, 'HH:mm:ss')
              )
            ).format('HH:mm:ss');
            totalTime = moment(
              moment(totalTime, 'HH:mm:ss').add(moment(diffTime, 'HH:mm:ss'))
            ).format('HH:mm:ss');
          }
          // console.log(totalTime);
          newGraphData.push({
            applicationName: graphItem[0].name,
            totalTime: totalTime,
          });
        }
        setGraphData(newGraphData);
        setIsLoading(false);
      });
  }, [isStateChange]);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <div className="mx-auto">
      <Chart graphData={graphData} isLoading={isLoading} />
    </div>
  );
};
export default DataGraph;
