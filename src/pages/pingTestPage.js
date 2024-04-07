import React, { useState, useEffect } from 'react';

function PingTestPage() {
    



    return (
    <div>
        <h1>Ping Test Page</h1>
        <p>Ping Result:</p>
        <pre>{pingResult}</pre>
        <p>Average Ping: {averagePing.toFixed(2)} ms</p>
    </div>
    );
}

export default PingTestPage;