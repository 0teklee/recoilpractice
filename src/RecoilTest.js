import React from 'react';
import {RecoilRoot,atom, selector, useRecoilState, useRecoilValue} from "recoil";


const RecoilTest = () => {

    return (
        <RecoilRoot>
            <CharacterCounter/>
        </RecoilRoot>
    );
};

export default RecoilTest;

const textState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: '' // default value (aka initial value)
})
// Atom은 상태(state)의 일부를 나타낸다. Atoms는 어떤 컴포넌트에서나 접근할 수 있다.
// atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다.
// 그래서 atom에 어떤 변화가 있다면, 그 atom을 구독하는 모든 컴포넌트가 재렌더링된다.

const CharacterCounter = () => {

    return (
        <div>
            <TextInput/>
            <CharacterCount/>
        </div>
    );
};

const TextInput = () => {
    const [text, setText] = useRecoilState(textState)
    // 컴포넌트가 atom을 읽고 쓰게 하기 위해서 useRecoilState 훅을 사용한다.
    const handleOnChange = (event) => {
        setText(event.target.value);
    }
    return (
        <div>
            <input type="text" value={text} onChange={handleOnChange}/>
            <br/>
            Echo: {text}
        </div>
    )
}

const charCountState = selector({
    key : 'charCountState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
        const text = get(textState)
        return text.length;
    }
})

// selector는 파생된 상태의 일부를 나타낸다. 파생된 상태는 상티의 변화다.
// 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.
// atom = 전역 상태, selector = atom의 상태를 함수에 넣어 도출된 결과물
// atom = textState, selector의 get에서는 atom의 길이(text.length)를 반환하게함.
// selector = charCountState, 상태를 함수로 가공한 결과물

const CharacterCount = () => {
    const count = useRecoilValue(charCountState)
    // useRecoilValue를 이용하여 selector에 접근할 수 있다.
    return <>Character Count: {count}</>
}
