import React, { useState, useRef, useEffect, useContext } from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
} from "react-native";
import { Colors } from '../common'
import { VictoryPie, VictoryChart, VictoryLine, VictoryScatter, VictoryAxis } from "victory-native";

export function VictoryPieCode({ colors, data }) {
    return <VictoryPie
        width={200}
        height={200}
        colorScale={colors}
        data={data}
    />
}

export function VictoryChartCode({ data }) {
    return <VictoryChart polar={false} height={390}>
        <VictoryLine
            interpolation={'linear'} data={data}
            style={{ data: { stroke: "#c43a31" } }}
        />
        <VictoryScatter data={data}
            size={5}
            style={{ data: { fill: "#c43a31" } }}
        />
        <VictoryAxis
            style={{
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent", size: 15 },
                tickLabels: {
                    fontSize: 9,
                    padding: 5,
                    fill: "white",
                },
            }
            }
        />
    </VictoryChart>
}

const styles = StyleSheet.create({

})