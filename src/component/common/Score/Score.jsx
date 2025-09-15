import { useEffect, useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";

const Score = ({ showFull }) => {
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const url = `https://cache.tresting.com/v2/api/getScoreByEventId?eventId=${id}`;

    async function fetchScore() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setScore(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchScore();
    const intervalId = setInterval(fetchScore, 1000);

    return () => clearInterval(intervalId);
  }, [id]);

  return (
    <div className={`score_data_custom ${showFull ? "" : "short_screen"}`}>
      <div className="i_frame_1 ">
        <div className="text-center">
          <div className="header d-flex">
            <div className="over px-1">
              {Array.from({ length: 6 }).map((_, i) => {
                const item = score?.data?.lastBalls?.[i] ?? ""; // fallback if missing
                return (
                  <div
                    key={i}
                    className={`overBall text-light bg-Primary text-dark ${
                      item === "W"
                        ? "bg-red"
                        : item == "6"
                        ? "bg-yellow"
                        : item == "4"
                        ? "bg-green"
                        : item == "WD"
                        ? "bg-WB"
                        : ""
                    }`}>
                    <span>{item || "-"}</span>
                  </div>
                );
              })}
            </div>
            <div className="welTxt d-flex justify-content-between ">
              <div>{score?.data?.currentBall}</div>
            </div>
          </div>
          <div className="subheader">{score?.data?.needByBall}</div>
        </div>
        <div className="d-flex justify-content-space-between w-100 m-auto">
          <div className="col-sm-6-match col-6 px-1">
            <div className="teamNameBox">
              <div className="teamBox">
                <div className="flagimg">
                  <img src={score?.data?.team1?.flag} alt="team1" />
                </div>
                <div className="team-name">{score?.data?.team1?.shortName}</div>
              </div>
              <div className="score">
                {score?.data?.team1?.score || "0-0"} (
                {score?.data?.team1?.overs || 0})
              </div>
            </div>
          </div>
          <div className="col-sm-6-match col-6  px-1 text-right">
            <div className="teamNameBox">
              <div className="teamBox">
                <div className="flagimg">
                  <img src={score?.data?.team2?.flag} alt="team1" />
                </div>
                <div className="team-name">{score?.data?.team2?.shortName}</div>
              </div>
              <div className="score">
                {score?.data?.team2?.score || "0-0"} (
                {score?.data?.team2?.overs || 0})
              </div>
            </div>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Runs</th>
                <th>Ball</th>
                <th>4s</th>
                <th>6s</th>
                <th>SR</th>
              </tr>
            </thead>
            <tbody className="tData">
              {score?.data?.batsman?.map((item) => {
                return (
                  <tr key={item?.name}>
                    <td>{item?.name}</td>
                    <td>{item?.run}</td>
                    <td>{item?.ball}</td>
                    <td>{item?.fours === 0 ? "-" : item?.fours}</td>
                    <td>{item?.sixes === 0 ? "-" : item?.sixes}</td>
                    <td>{item?.strike_rate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="footer d-flex w-100 justify-content-between px-2">
          <div className=" text-start" style={{ width: "70%" }}>
            CRR : 0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
