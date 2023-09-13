import { useSelector } from "react-redux";
import WeatherLoader from "../../utils/lotties/cloud-spinner.json";
import Lottie from "lottie-react";
import { ApplicationState } from "../../store/store";

const AppWrapper = (props: any) => {
  const { children } = props;
  const globalEvents = useSelector(
    (state: ApplicationState) => state.globalEvents
  );
  const loading = globalEvents.pendingTasks > 0;

  return (
    <>
      {!!loading && (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
          }}
        >
          <div
            style={{
              WebkitTransform: "translate(-50%, -50%)",
              transform: "translate(-50%, -50%)",
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: 99,
            }}
          >
            <Lottie
              style={{ height: "400px" }}
              animationData={WeatherLoader}
              loop={true}
            />
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default AppWrapper;
