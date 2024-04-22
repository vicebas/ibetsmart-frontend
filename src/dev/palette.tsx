import {Fragment} from "react";
import {
    Category,
    Component,
    Variant,
    Palette,
} from "@react-buddy/ide-toolbox";
import AntdPalette from "@react-buddy/palette-antd";
import ChakraPalette from "@react-buddy/palette-chakra-ui";
import Meta from "antd/es/card/Meta";
import {Card} from "antd";

export const PaletteTree = () => (
    <Palette>
        <Category name="App">
            <Component name="Loader">
                <Variant>
                    <ExampleLoaderComponent/>
                </Variant>
            </Component>
        </Category>
        <AntdPalette/>
        <ChakraPalette/>
        <Category name="Data Display">
            <Component name="Card">
                <Variant name="GameCard">
                    <Card title="Card title">
                        <Meta title="Europe Street beat" description="www.instagram.com"/>
                    </Card>
                </Variant>
            </Component>
        </Category>
    </Palette>
);

export function ExampleLoaderComponent() {
    return (
        <Fragment>Loading...</Fragment>
    );
}