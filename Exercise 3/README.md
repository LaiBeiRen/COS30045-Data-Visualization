# Exercise 3 – Data Story: TV Energy Consumption

## Overview

In this exercise, you will develop a **data story** based on the **TV Energy Consumption dataset**. Using the website created in **Exercise 0.2**, you will extend your work to present a meaningful narrative supported by data visualisations.

Your goal is to communicate insights from the dataset in a clear and engaging way through your **website and written explanation**.

You must use the **Exercise 3 folder in your existing forked repository** and reuse the files created in **Exercise 0.2**.

---

## Data Story

### Audience
The audience is Australian consumers who are planning to purchase a television and want to understand how their choice may effect electricity consumption

### Main Question
How does television screen size affect annual energy consumption?

### Purpose
The visualization aims to help consumers understand whether choosing a larger television is likely to result in higher yearly electricity use.

### Story Overview

This visualisation explores patterns in **TV energy consumption** across different television models and specifications.

The goal is to help viewers understand:

- How energy consumption varies between television models
- The relationship between **screen size and power consumption**
- How **energy efficiency ratings** impact energy usage
- Trends that may help consumers choose more **energy-efficient televisions**

The website presents these insights through visualisations and explanatory text that guide the viewer through the data.

---

## About the Data

### Data Source

The dataset used in this project contains information about **television models and their energy consumption characteristics**, including power usage, screen size, technology type, and efficiency ratings.

The dataset was provided as part of the course materials.

### Data Processing

The original dataset contained 4,724 television records.

The data was processed in KNIME before being used for the visualisations.

The processing included:

- selecting attributes relevant to the analysis
- converting television screen size into inches
- grouping televisions into Small, Medium and Large screen-size categories
- checking the analytical variables for missing values
- identifying duplicate television records
- removing 256 duplicate record

No rows were removed during the missing-value processing stage for the variables required for the analysis.

After duplicate removal, the cleaned dataset contained 4,468 records.

This cleaned dataset was exported as `tvcleaned.csv` and is used for the Exercise 3 analysis.

### Privacy

The dataset does not contain any **personal or sensitive information**. It focuses solely on product specifications and energy consumption data related to television devices.

### Accuracy and Limitations

While the dataset provides useful information about TV energy consumption, there are some limitations:

- The dataset may not include **all available television models**
- Some information may be **outdated or incomplete**
- Energy consumption may vary depending on **real-world usage conditions**

These factors should be considered when interpreting the visualisations.

### Ethics

When presenting data visualisations, it is important to ensure that the information is represented **accurately and responsibly**.

This project follows ethical data visualisation practices by:

- Avoiding misleading visual representations
- Clearly explaining the context of the data
- Presenting information transparently so viewers can interpret the results correctly

---

## AI Declaration

Generative AI tools were used to assist with aspects of this exercise, including:

- discussing possible data-story questions
- reviewing the structure of the README
- providing guidance on KNIME data-cleaning steps
- assisting with explanations and documentation
- providing guidance for website development

AI-generated suggestions were reviewed and modified before being included in the project. The data processing, interpretation and final submitted work were checked by the student.

---

## Website Storytelling

The website has been updated to communicate a **data-driven story** based on the TV energy consumption dataset.

The website includes:

- Visualisations that present key insights from the dataset
- Text explanations that help readers understand the meaning of the visualisations
- Context that connects the data to real-world implications

The aim is to guide the viewer through the data in a way that is **informative, engaging, and easy to understand**.
