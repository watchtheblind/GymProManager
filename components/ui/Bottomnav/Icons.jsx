import React from 'react'
import Svg, {Path} from 'react-native-svg'

export const Dumbbellicon = ({color, size}) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'>
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M21.6391 5.23689L23.4356 7.03338C24.1882 7.78602 24.1882 9.01064 23.4355 9.76323L21.7322 11.4665C20.9778 12.221 19.7568 12.2209 19.0024 11.4665L17.2774 9.74153L9.74153 17.2774L11.4665 19.0024C12.221 19.7569 12.221 20.9778 11.4665 21.7322L9.76328 23.4355C9.01064 24.1882 7.78602 24.1881 7.03343 23.4355L5.63372 22.0359L4.76229 22.9073C4.19276 23.4769 3.27084 23.4767 2.70145 22.9073L1.48954 21.6954C0.921415 21.1272 0.921415 20.2027 1.48949 19.6346L2.36097 18.7631L0.56448 16.9666C-0.18816 16.214 -0.18816 14.9894 0.56448 14.2368L2.26778 12.5335C3.0222 11.779 4.2432 11.7791 4.99762 12.5335L6.76139 14.2973L14.2974 6.76139L12.5335 4.99758C11.779 4.24316 11.7791 3.02224 12.5335 2.26778L14.2368 0.56448C14.9894 -0.18816 16.214 -0.18816 16.9666 0.56448L18.3663 1.96414L19.2378 1.09276C19.8073 0.523133 20.7292 0.523273 21.2986 1.09276L22.5105 2.30462C23.0786 2.87284 23.0786 3.79729 22.5106 4.36546L21.6391 5.23689Z'
      fill={color} // Usa el color pasado como prop
    />
  </Svg>
)

export const Goalicon = ({color, size}) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'>
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.7375 8.34063C12.4989 8.29323 12.2523 8.26788 12 8.26788C9.91522 8.26788 8.21918 9.96393 8.21918 12.0487C8.21918 14.1335 9.91522 15.8295 12 15.8295C14.0848 15.8295 15.7808 14.1335 15.7808 12.0487C15.7808 11.7964 15.7555 11.5498 15.7081 11.3112L13.4853 13.534C13.0885 13.9307 12.561 14.1492 12 14.1492C11.439 14.1492 10.9115 13.9307 10.5147 13.534C10.118 13.1372 9.89954 12.6097 9.89954 12.0487C9.89954 11.4877 10.118 10.9602 10.5147 10.5634L12.7375 8.34063Z'
      fill={color}
    />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M22.9261 7.08875L21.4133 8.60156C21.2618 8.75299 21.0912 8.8786 20.907 8.97601C21.2402 9.9397 21.4219 10.9733 21.4219 12.0487C21.4219 17.244 17.1953 21.4706 12 21.4706C6.80475 21.4706 2.57812 17.244 2.57812 12.0487C2.57812 6.85345 6.80475 2.62683 12 2.62683C13.0757 2.62683 14.1099 2.80865 15.0738 3.14209C15.1714 2.9577 15.2961 2.78632 15.4473 2.63525L16.96 1.12262C15.4473 0.433228 13.7679 0.0487061 12 0.0487061C5.38312 0.0487061 0 5.43182 0 12.0487C0 18.6656 5.38312 24.0487 12 24.0487C18.6169 24.0487 24 18.6656 24 12.0487C24 10.2808 23.6155 8.60138 22.9261 7.08875Z'
      fill={color}
    />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M15.001 6.04992L14.8722 4.52345C13.9796 4.18139 13.0114 3.9939 12 3.9939C7.55859 3.9939 3.94519 7.60729 3.94519 12.0487C3.94519 16.4901 7.55859 20.1035 12 20.1035C16.4414 20.1035 20.0548 16.4901 20.0548 12.0487C20.0548 11.0372 19.8673 10.069 19.5252 9.17645L17.9988 9.04765L16.8784 10.1678C17.1043 10.7519 17.2285 11.3859 17.2285 12.0487C17.2285 14.9318 14.8831 17.2772 12 17.2772C9.11689 17.2772 6.77143 14.9318 6.77143 12.0487C6.77143 9.16559 9.11689 6.82014 12 6.82014C12.6628 6.82014 13.2968 6.94434 13.8808 7.17029L15.001 6.04992Z'
      fill={color}
    />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16.389 4.07819L16.5913 6.47503L11.7104 11.3559C11.439 11.6271 11.439 12.0671 11.7104 12.3383C11.8459 12.474 12.0237 12.5419 12.2016 12.5419C12.3794 12.5419 12.5573 12.474 12.6928 12.3383L17.5737 7.45743L19.9706 7.65952C19.9901 7.66115 20.0095 7.66206 20.029 7.66206C20.2125 7.66206 20.3894 7.58932 20.5202 7.45852L23.4676 4.51095C23.6588 4.3199 23.7218 4.03513 23.629 3.78112C23.536 3.52711 23.3042 3.35017 23.0348 3.32755L20.901 3.14753L20.7212 1.01393C20.6984 0.744361 20.5215 0.512602 20.2676 0.419789C20.0136 0.326796 19.7288 0.389937 19.5376 0.58099L16.5902 3.52855C16.4455 3.67329 16.3718 3.87429 16.389 4.07819Z'
      fill={color}
    />
  </Svg>
)

export const Profileicon = ({color, size}) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'>
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.3945 11.2487H13.6054C18.2397 11.2531 21.9953 14.732 22 19.0247V20.7767C21.9953 22.5819 20.4166 24.0443 18.4677 24.0487H6.53225C4.58342 24.0443 3.00473 22.5819 3 20.7767V19.0247C3.00473 14.732 6.76032 11.2531 11.3945 11.2487Z'
      fill={color} // Usa el color pasado como prop
    />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M18.2273 5.2487C18.2273 8.12056 15.7139 10.4487 12.6136 10.4487C9.51526 10.4443 7.00473 8.11878 7 5.2487C7 2.37684 9.51333 0.0487061 12.6136 0.0487061C15.7139 0.0487061 18.2273 2.37684 18.2273 5.2487Z'
      fill={color} // Usa el color pasado como prop
    />
  </Svg>
)

export const Settingsicon = ({size}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 18 16'
      fill='none'>
      <Path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M6.40392 3.11648C6.40392 1.39874 4.96803 0 3.20196 0C1.43692 0 0 1.39874 0 3.11648C0 4.83421 1.43692 6.23094 3.20196 6.23094C4.96803 6.23094 6.40392 4.83421 6.40392 3.11648ZM18 12.8845C18 11.1668 16.5641 9.76906 14.7991 9.76906C13.033 9.76906 11.5961 11.1668 11.5961 12.8845C11.5961 14.6023 13.033 16 14.7991 16C16.5641 16 18 14.6023 18 12.8845ZM13.1389 12.8845C13.1389 11.999 13.8836 11.2785 14.7991 11.2785C15.7135 11.2785 16.4571 11.999 16.4571 12.8845C16.4571 13.7711 15.7135 14.4906 14.7991 14.4906C13.8836 14.4906 13.1389 13.7711 13.1389 12.8845ZM7.28264 12.1689C7.70847 12.1689 8.05407 12.507 8.05407 12.9236C8.05407 13.3402 7.70847 13.6783 7.28264 13.6783H0.80157C0.375739 13.6783 0.0301373 13.3402 0.0301373 12.9236C0.0301373 12.507 0.375739 12.1689 0.80157 12.1689H7.28264ZM3.20196 1.50943C2.28756 1.50943 1.54287 2.22994 1.54287 3.11648C1.54287 4.00201 2.28756 4.72151 3.20196 4.72151C4.11739 4.72151 4.86106 4.00201 4.86106 3.11648C4.86106 2.22994 4.11739 1.50943 3.20196 1.50943ZM17.4252 3.17021C17.4252 2.75361 17.0796 2.4155 16.6538 2.4155H10.1738C9.74793 2.4155 9.40233 2.75361 9.40233 3.17021C9.40233 3.58682 9.74793 3.92493 10.1738 3.92493H16.6538C17.0796 3.92493 17.4252 3.58682 17.4252 3.17021Z'
        fill='white'></Path>
    </Svg>
  )
}

export const Portrait = ({size}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 348 199'
      fill='none'>
      <Path
        d='M312.455 38.4844L341.259 14.1559L333.96 44.9179L312.455 38.4844Z'
        fill='#B0A462'
      />
      <Path
        d='M4.93774 192.566L33.7417 168.238L26.4429 199L4.93774 192.566Z'
        fill='#FEF4C9'
      />
      <Path
        d='M0 25.0061L25.665 41.3789L33.7418 10.3447L0 25.0061Z'
        fill='#DFAA8C'
      />
      <Path
        d='M312.455 10.52L320.095 21.7784L328.914 10.3447L312.455 10.52Z'
        fill='#FEF4C9'
      />
      <Path
        d='M4.93774 164.602L12.5777 175.86L21.3972 164.427L4.93774 164.602Z'
        fill='#B0A462'
      />
      <Path
        d='M47.684 15.4951L60.8656 11.9867L52.9457 3.76364e-06L47.684 15.4951Z'
        fill='#6CB0B4'
      />
      <Path
        d='M306.42 178.871L326.994 161.432L321.78 183.483L306.42 178.871Z'
        fill='#6CB0B4'
      />
      <Path
        d='M329.86 192.299L332.73 165.6L344.213 185.174L329.86 192.299Z'
        fill='#CC7751'
      />
    </Svg>
  )
}
