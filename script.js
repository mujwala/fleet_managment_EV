function showContent(section) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = ''; 

    if (section === 'ev-intro') {
        contentArea.innerHTML = `
            <h2>Electric Vehicle Introduction</h2>
            <p>Electric vehicles (EVs) are automobiles powered by electric motors using energy stored in rechargeable batteries, offering a sustainable alternative to internal combustion engine (ICE) vehicles that rely on fossil fuels. This project involves generating a synthetic dataset for five EV models: Maruti Jimny EV, Nissan ARIYA, Honda Clarity EV, Hyundai Ioniq 5, and Citroen eC3. Each car has predefined specifications, such as top speed, battery capacity, power, torque, and drivetrain type. The dataset includes various attributes like acceleration (influenced by driver skill), effective range (ER), charging cost, maintenance cost, and dimensions. It also records metadata such as the assigned driver, manager, and date of operation. A total of 1000 records were generated, spanning a date range from January 1 to December 31, 2023. The dataset, saved as synthetic_ev_dataset_with_updated_range.csv, facilitates insights into monthly maintenance and charging costs for each make and the latest records based on operation dates. These parameters enable detailed analysis of EV performance, costs, and operational efficiency under simulated  conditions.</p>
        `;
    } else if (section === 'dataset') {
        contentArea.innerHTML = `
            <h2>Dataset</h2>
            <p>Below is the dataset used for this analysis:</p>
            <a href="assets/datasets/dataset.csv" download>Download Dataset</a>
        `;
    } else if (section === 'distributions') {
        contentArea.innerHTML = `
            <h2>Distributions</h2>
            <label for="distribution-select">Select Distribution:</label>
            <select id="distribution-select" onchange="displayImage('assets/images', this.value)">
                <option value="">Select...</option>
                <option value="Acceleration.png">Acceleration</option>
                <option value="total number of vehicles per Make.png">total number of vehicles per Make</option>
                <option value="Battery Capacity (BC) by Make.png">Battery Capacity (BC) by Make</option>
                <option value="Monthly Charging Costs by Make.png">Monthly Charging Costs by Make</option>
                <option value="Gross Vehicle Weight.png">Gross Vehicle Weight</option>
                <option value="Total Power by Drive Type.png">Total Power by Drive Type</option>
                <option value="Cargo Volume.png">Cargo Volume</option>
                <option value="Number of Seats.png">Number of Seats</option>
                <option value="Maintenance Cost by Make.png">Maintenance Cost by Make</option>
            </select>
            <div id="image-display" class="mt-4"></div>
        `;
    } else if (section === 'relationships') {
        contentArea.innerHTML = `
            <h2>Relationships</h2>
            <label for="relationship-select">Select Relationship:</label>
            <select id="relationship-select" onchange="displayImage('assets/images', this.value)">
                <option value="">Select...</option>
                <option value="Top Speed by Acceleration.png">Top Speed by Acceleration</option>
                <option value="Gross Vehicle Weight  vs. Max Payload.png">Gross Vehicle Weight vs. Max Payload</option>
                <option value="Total Power vs. Total Torque.png">Total Power vs. Total Torque</option>
                <option value="Wheelbase vs. Cargo Volume.png">Wheelbase vs. Cargo Volume</option>
                <option value="Charging Cost vs. Month.png">Charging Cost vs. Month</option>
            </select>
            <div id="image-display" class="mt-4"></div>
        `;
    } else if (section === 'status') {
        contentArea.innerHTML = `
            <h2>Vehicle Status</h2>
            <label for="status-select">Select Status:</label>
            <select id="status-select" onchange="displayImage('assets/status', this.value)">
                <option value="">Select...</option>
                <option value="Low Range Warning distribution.png">Low Range Warning distribution</option>
                <option value="Active vs. Inactive Vehicles total speed.png">Active vs. Inactive Vehicles total speed</option>
                <option value="Effective Range comparison.png">Effective Range comparison</option>
            </select>
            <div id="image-display" class="mt-4"></div>
        `;
    } else if (section === 'prediction') {
        contentArea.innerHTML = `
            <h2>Predict Vehicle Range</h2>
            <form action="index1.html" method="GET">
                <label for="car_name">Car Name:</label>
                <select id="car_name" name="car_name" onchange="updateFeatures(this.value)">
                    <option value="" disabled selected>Select a car</option>
                    <option value="Honda Clarity EV">Honda Clarity EV</option>
                    <option value="Hyundai Ioniq 5">Hyundai Ioniq 5</option>
                    <option value="Maruti Jimny EV">Maruti Jimny EV</option>
                    <option value="Nissan ARIYA">Nissan ARIYA</option>
                </select>
                <button type="submit">Predict</button>
            </form>
        `;
    }
}
