import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialValues, caterersMealsObj } from '../../../setup/data';
import MealImageModal from '../../../../src/app/shared/Modal/MealImageModal/MealImageModal';
import ConnectedMealImageModal from '../../../../src/app/shared/Modal/MealImageModal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  ...initialValues,
  meals: { ...initialValues.meals, items: caterersMealsObj.meals }
});
const props = {
  formerImgURL: 'image.jpg',
  updating: false,
  mealId: '1234',
  editMeal: jest.fn()
};

describe('MealImageModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const shallowWrapper = shallow(<MealImageModal {...props} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  // it('calls editMeal function on file change', () => {
  //   const editMealMock = jest.fn();
  //   const event = {
  //     target: {
  //       files: [new Blob([''], {
  //         type: 'image/jpeg',
  //         size: '500'
  //       })]
  //     }
  //   };
  //   const comp = (
  //     <Provider store={store}>
  //       <MealImageModal
  //         {...props}
  //         formerImgURL="https://firebasestorage.googleapis.com/v0/b/book-a-meal.appspot.com/o/images%2Fplaceholder-image.jpg?alt=media&token=e688dcde-0496-4a10-a456-0825e5202c62"
  //         editMeal={editMealMock}
  //       />
  //     </Provider>
  //   );
  //   const wrapper = mount(comp);

  //   // const handleUploadSuccessSpy =
  // jest.spyOn(wrapper.find('MealImageModal').instance(), 'handleUploadSuccess');

  //   mocksdk.storage().ref = () => ({
  //     put: () => ({
  //       ref: {
  //         getDownloadURL: () => new Promise(resolve => resolve('http.img.test'))
  //       }
  //     })
  //   });

  //   wrapper.find('input').simulate('change', event);

  //   expect(editMealMock).toHaveBeenCalled();
  // });

  it('renders connected component correctly', () => {
    const comp = (<Provider store={store}><ConnectedMealImageModal {...props} /></Provider>);
    const mountedWrapper = mount(comp);

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });
});
