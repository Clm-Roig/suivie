const commonBoxProps = {
  mt: 2,
  mx: -2,
  p: 2
};

const boxType1Props = {
  bgcolor: 'primary.main',
  color: 'common.white',
  ...commonBoxProps
};

const boxType2Props = {
  ...commonBoxProps
};

export { boxType1Props, boxType2Props };
