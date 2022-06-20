import React, { Component } from 'react';
import { Modal, Dimensions, Image, Animated, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View, Text } from 'react-native';



const deviceHeigth = Dimensions.get("window").height;
class PoppupBottom extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            show: false,
            animationValue: new Animated.Value(0),
            viewState: true,
            btnActive: 0,
        };
    }
    componentDidMount()
    {
        // this.Show();
        this.setState(state =>
        {
            return {
                btnActive: 0
            }
        })
    }
    Show = () =>
    {
        this.setState(state => { return { show: true } })

    }
    Close = () =>
    {

        this.setState(state => { return { show: false } })


    }
    renderOutsideTouchable = (onTouch) =>
    {
        const view = <View style={{
            flex: 1, width: "100%"
        }}></View>

        if (!onTouch) {
            return view;
        }
        return <TouchableNativeFeedback onPress={onTouch} style={{ flex: 1, width: "100%" }}>
            {view}
        </TouchableNativeFeedback>
    }
    renderTitle = () =>
    {
        const { title } = this.props;
        return <View style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            marginBottom: -10
        }}>
            <Text style={{

                color: "#182E44",
                fontSize: 15,
                fontWeight: "bold",
                fontStyle: "italic",

            }}>{title}</Text>
            {/* <View style={{
                borderColor: "#64ffcb",
                borderBottomWidth: 3,
                marginTop: -23
            }}>
                <Text style={{
                    opacity: 0,
                    marginHorizontal: 2
                }}>{title}</Text>
            </View> */}
        </View>
    }
    renderSeparator = () =>
    {
        return <View
            style={{
                opacity: 0.1,
                backgroundColor: "#182E44",
                height: 1
            }}
        >

        </View>
    }
    renderContent = () =>
    {
        const { stackNavigator, navigation } = this.props;


        return <View style={{
            justifyContent: "space-around",
            alignItems: "center",

            width: "100%",

            paddingHorizontal: 16
        }}>

            <View style={{
                justifyContent: "space-around",
                // alignItems: "center",
                paddingVertical: 20,
                width: "100%",

            }}>
                <Text style={{
                    fontStyle: "italic",
                    color: "#969696",
                    lineHeight: 27,
                    textAlign: "left",
                    fontSize: 15
                }}>
                    Users use the Receive And Transfer function to transfer fund in and out of MOVEARN
                </Text>
            </View>
        </View>
    }

    render()
    {

        const { show } = this.state;
        const { onTouchOutside, title, stackNavigator, navigation } = this.props;

        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.Close}
            >
                <TouchableNativeFeedback onPress={onTouchOutside} style={{ flex: 1, width: "100%" }}>

                    <View style={{
                        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#0000004d',
                    }}>



                        <View style={{
                            backgroundColor: "#ffffff",
                            width: "75%",

                            backgroundColor: "#ffffff",
                            borderRadius: 20,
                            paddingHorizontal: 0,
                            paddingVertical: 0,


                        }}>
                            {this.renderTitle()}
                            {this.renderContent()}
                        </View>


                        <TouchableOpacity style={{
                            fontStyle: "italic", fontWeight: 'bold',

                            marginTop: 20,
                            // borderBottomWidth: 3,


                            width: 30,
                            height: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",


                        }}

                            onPress={this.Close}>
                            <Image style={{

                                width: 30,
                                height: 30,
                                resizeMode: "contain"
                            }} source={{ uri: "ic_close_red" }} />
                        </TouchableOpacity>
                    </View>
                </TouchableNativeFeedback>
            </Modal >
        );
    }
}

const styles = StyleSheet.create({

    text: {

        color: "#182E44",
        fontSize: 15,
        fontWeight: "bold",
        margin: 15,
        fontStyle: "italic",
        textDecorationLine: "underline",
        textDecorationColor: "#64ffcb",
        textDecorationStyle: 'solid'
    },

});

export default PoppupBottom;
