import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, id, rating, author, comment) => dispatch(postComment(dishId, id, rating, author, comment))
})



function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                        <Icon raised reverse name={props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50' onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
                        <Icon raised reverse name='pencil' type='font-awesome' color='#512DA8'
                            onPress={() => props.toggleModal()} />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Rating readonly imageSize={10} type='star' startingValue={item.rating}></Rating>
                </View>
                <Text style={{ fontSize: 12 }}>{'--' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
            </Card>
        </Animatable.View>
    )
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 5,
            author: '',
            comment: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Dish Detail',
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleComments() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({ showModal: false })
    }

    submitForm(dishId) {        
        this.props.postComment(dishId, this.props.comments.comments.length, this.state.rating, this.state.author, this.state.comment);
        this.resetForm();
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '')

        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.setState({ showModal: true })}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                >
                    <Rating showRating type='star' onFinishRating={(val) => { this.setrating(val) }} startingValue={this.state.rating}></Rating>
                    <Input
                        placeholder=' Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(text) => this.setState({ author: text })}
                    ></Input>
                    <Input placeholder=' comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        onChangeText={(text) => this.setState({ comment: text })}
                    ></Input>
                    <View style={styles.modal}>
                        <Button
                            onPress={() => { this.toggleModal(); this.submitForm(dishId); }}
                            color="#512DA8"
                            title="Submit"
                        />
                        <Button
                            onPress={() => { this.toggleModal(); }}
                            color="#f50"
                            title="Cancel"
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);