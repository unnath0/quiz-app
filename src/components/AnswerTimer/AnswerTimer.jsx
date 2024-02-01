import { useEffect,useState,useRef } from "react";
import "./AnswerTimer.scss";

function AnswerTimer({ duration, onTimeUp }) {
    const [timer, setTimer] = useState(0);
    const [progressLoaded, setProgressLoaded] = useState(0);
    const intervalRef = useRef(); // used to clean up the interval effect

    useEffect(() => {
        // use setInterval to refresh the timer every 1 second
        intervalRef.current = setInterval(() => {
            setTimer((cur) => cur + 0.1)
        }, 100);

        return () => clearInterval(intervalRef.current); // cleans up the interval effect
    }, []);

    useEffect(() => {
        // update the progress percentage every time timer count increases
        setProgressLoaded((timer / duration) * 100); // calculate the percentage of progress from the total duration

        if (timer >= duration) {
            clearInterval(intervalRef.current);

            setTimeout(() => {
                onTimeUp();
            }, 100);
        }
    }, [timer]);

    return <div className="answer-timer-container">
        <div 
            style={{
                width: `${progressLoaded}%`,
                backgroundColor: `${
                    progressLoaded < 40
                    ? 'lightgreen'
                    : progressLoaded < 70
                    ? 'orange'
                    : 'red'
                }`
            }}
            className="progress">
        </div>
    </div>;
}

export default AnswerTimer;