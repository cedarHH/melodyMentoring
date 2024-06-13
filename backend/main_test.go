package main

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestMain(m *testing.M) {
	m.Run()
}

func TestJenkins(t *testing.T) {
	require.Equal(t, "Hello!!!", Hello())
}
