import React from 'react';

/**
 * Contador Component
 * 
 * Auto-incrementing counter that updates every second.
 * Demonstrates manual state management with setInterval and clearInterval.
 * 
 * Key concepts:
 * 1. setInterval - Executes code at regular intervals
 * 2. clearInterval - Stops the interval to prevent memory leaks
 * 3. String.padStart - Formats numbers with leading zeros (6 digits)
 * 4. Event handling - Stop/Resume and Reset functionality
 * 
 * @component
 */
class Contador extends React.Component {
    constructor(props) {
        super(props);
        // State management - demonstrating React's original state pattern
        this.state = {
            count: 0,
            isRunning: true,
            intervalId: null
        };
    }

    componentDidMount() {
        // Start the auto-incrementing counter when component mounts
        this.startCounter();
    }

    componentWillUnmount() {
        // Clean up: Stop the interval when component unmounts
        // This prevents memory leaks
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
    }

    startCounter = () => {
        // Start the interval - increments counter every 1000ms (1 second)
        const intervalId = setInterval(() => {
            this.setState((prevState) => ({
                count: prevState.count + 1
            }));
        }, 1000);
        
        this.setState({ intervalId, isRunning: true });
    }

    stopCounter = () => {
        // Stop the interval
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
            this.setState({ isRunning: false });
        }
    }

    resumeCounter = () => {
        // Resume the interval if it was stopped
        if (!this.state.isRunning) {
            this.startCounter();
        }
    }

    toggleCounter = () => {
        // Toggle between stop and resume
        if (this.state.isRunning) {
            this.stopCounter();
        } else {
            this.resumeCounter();
        }
    }

    resetCounter = () => {
        // Reset the counter to 0
        this.stopCounter();
        this.setState({ count: 0 });
        setTimeout(() => this.startCounter(), 100);
    }

    // Format the counter with 6 digits and leading zeros
    // Example: 1 → "000001", 42 → "000042", 1234 → "001234"
    formatCounter = (num) => {
        return String(num).padStart(6, '0');
    }

    render() {
        const { count, isRunning } = this.state;
        const formattedCount = this.formatCounter(count);

        return (
            <div className="container-counter">
                <div className="counter-wrapper">
                    {/* Header */}
                    <h1 className="counter-title">
                        <i className="fas fa-clock"></i> Simple Counter
                    </h1>

                    {/* Display with 6-digit formatting */}
                    <div className="hora">
                        {formattedCount}
                    </div>

                    {/* Control Buttons */}
                    <div className="buttons">
                        <button 
                            className="btn btn-stop"
                            onClick={this.toggleCounter}
                            title={isRunning ? "Pausar contador" : "Reanudar contador"}
                        >
                            <i className={`fas ${isRunning ? 'fa-pause' : 'fa-play'}`}></i>
                            {isRunning ? 'Pausar' : 'Reanudar'}
                        </button>

                        <button 
                            className="btn btn-reset"
                            onClick={this.resetCounter}
                            title="Reiniciar contador a 0"
                        >
                            <i className="fas fa-redo"></i> Resetear
                        </button>
                    </div>

                    {/* Status indicator */}
                    <div className="status-indicator">
                        <span className={`status-dot ${isRunning ? 'running' : 'paused'}`}></span>
                        <span className="status-text">
                            {isRunning ? 'En ejecución' : 'Pausado'}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contador;
