import {
    Avatar,
    AvatarSize,
    Button,
    ButtonDesign,
    Card,
    FCLLayout,
    FlexBox,
    FlexBoxDirection,
    FlexibleColumnLayout,
    Label,
    List,
    RatingIndicator,
    StandardListItem,
    Title,
    Toolbar,
    ToolbarDesign,
    ToolbarSpacer,
    Text // Import the Text component from @ui5/webcomponents-react
  } from '@ui5/webcomponents-react';
  import { useState } from 'react';
  
  const UserDrillDownTemplate = () => {
    const movieData = [
      {
        movie: 'Shanghai',
        genre: 'Crime|Thriller',
        country: 'Russia'
      },
      {
        movie: 'Three Musketeers, The',
        genre: 'Action|Adventure|Romance',
        country: 'France'
      },
      {
        movie: 'Secrets of the Heart (Secretos del Corazón)',
        genre: 'Drama',
        country: 'Japan'
      }
    ];
    const castData = [
      {
        name: 'Clywd Gimeno',
        gender: 'Male'
      },
      {
        name: 'Essie Gadson',
        gender: 'Female'
      },
      {
        name: 'Claresta Greger',
        gender: 'Female'
      },
      {
        name: 'Phil Koppens',
        gender: 'Female'
      }
    ];
  
    const [layout, setLayout] = useState(FCLLayout.OneColumn);
    const [selectedMovie, setSelectedMovie] = useState(movieData[0]);
    const [selectedCast, setSelectedCast] = useState(castData[0]);
  
    const onStartColumnClick = (e) => {
      const movie = movieData.find((item) => item.movie === e.detail.item.dataset.movie);
      if (movie) {
        setSelectedMovie(movie);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
      }
    };
  
    const onMiddleColumnClick = (e) => {
      const cast = castData.find((item) => item.name === e.detail.item.dataset.name);
      if (cast) {
        setSelectedCast(cast);
        setLayout(FCLLayout.ThreeColumnsEndExpanded);
      }
    };
  
    return (
      <div>
        <FlexibleColumnLayout
          hideArrows
          style={{
            height: '100%',
            marginTop: '0.5rem',
            marginBottom: '0.5rem',
            transition: 'all 0.3s ease-in-out'
          }}
          layout={layout}
          startColumn={
            <>
              <List headerText="Movies" onItemClick={onStartColumnClick}>
                {movieData.map((item) => (
                  <StandardListItem description={item.genre} data-movie={item.movie} key={item.movie}>
                    {item.movie}
                  </StandardListItem>
                ))}
              </List>
            </>
          }
          midColumn={
            <>
              <Toolbar design={ToolbarDesign.Solid}>
                <Title>{selectedMovie.movie}</Title>
                <ToolbarSpacer />
                <Button
                  icon="decline"
                  design={ButtonDesign.Transparent}
                  onClick={() => {
                    setLayout(FCLLayout.OneColumn);
                  }}
                />
              </Toolbar>
              <Toolbar
                style={{
                  height: '200px'
                }}
              >
                <Avatar
                  icon="video"
                  size={AvatarSize.XL}
                  style={{
                    marginLeft: '12px'
                  }}
                />
                <FlexBox
                  direction={FlexBoxDirection.Column}
                  style={{
                    marginLeft: '6px'
                  }}
                >
                  <FlexBox>
                    <Label>Movie:</Label>
                    <Text
                      style={{
                        marginLeft: '2px'
                      }}
                    >
                      {selectedMovie.movie}
                    </Text>
                  </FlexBox>
                  <FlexBox>
                    <Label>Genre:</Label>
                    <Text
                      style={{
                        marginLeft: '2px'
                      }}
                    >
                      {selectedMovie.genre}
                    </Text>
                  </FlexBox>
                  <FlexBox>
                    <Label>Country:</Label>
                    <Text
                      style={{
                        marginLeft: '2px'
                      }}
                    >
                      {selectedMovie.country}
                    </Text>
                  </FlexBox>
                </FlexBox>
                <RatingIndicator
                  style={{
                    marginLeft: '100px'
                  }}
                  value={Math.floor(Math.random() * 5) + 1}
                />
              </Toolbar>
              <List headerText="Cast" onItemClick={onMiddleColumnClick}>
                {castData.map((item) => (
                  <StandardListItem description={item.gender} data-name={item.name} key={item.name}>
                    {item.name}
                  </StandardListItem>
                ))}
              </List>
            </>
          }
          endColumn={
            <>
              <Card>
                <h1>hii</h1>
              </Card>
            </>
          }
        />
      </div>
    );
  };
  
  export default UserDrillDownTemplate;
  