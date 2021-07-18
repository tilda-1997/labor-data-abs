# Interactive Chart - Weekly Payroll Jobs & Wages 📈
This site represents the labour data of Australia during the COVID stage, from Jan 2020 to Jan 2021. The original data comes from ABS (Australian Bureau of Statistics), and the data used in the chart has been preprocessed using python. This chart can dynamically reflect the changes in labour data over time according to time.

The chart using D3 library for better data visualizations and the chart is published at 🔗 [Observable](https://observablehq.com/@tilda-1997/chart).

📉 Here is a screenshot during one demonstration.
![Image text](https://github.com/tilda-1997/labor-data-abs/blob/586e088680e3302b96f2e0deae772b96f24d61e2/demonstration.png)

### Initial state of the page
The project can be started using 'npm start'. And the defalut settings are shown below.
![Image text](https://github.com/tilda-1997/labor-data-abs/blob/586e088680e3302b96f2e0deae772b96f24d61e2/default.png)

### The filter function
The filters are designed to select more targeted groups with specific regions, industries and genders.
![Image text](https://github.com/tilda-1997/labor-data-abs/blob/586e088680e3302b96f2e0deae772b96f24d61e2/filters.png)


### Information display
Move the cursor on one circle and the chart will show the detailed information of that specific group. Here are two examples.
![Image text](https://github.com/tilda-1997/labor-data-abs/blob/586e088680e3302b96f2e0deae772b96f24d61e2/display%20circle%20info.png)
![Image text](https://github.com/tilda-1997/labor-data-abs/blob/586e088680e3302b96f2e0deae772b96f24d61e2/display%20info.png)

### Disable the filter when the chart is playing
Click on the 'play' button to start the chart. When the chart is playing, the filter will be disabled. Only after the demonstration the filters will be back to active.
![Image text](https://github.com/tilda-1997/labor-data-abs/blob/586e088680e3302b96f2e0deae772b96f24d61e2/disable%20filter.png)

